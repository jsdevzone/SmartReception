package com.smartreception.eid;


import android.content.Context;
import android.smartcardio.ATR;
import android.smartcardio.CardNotPresentException;
import android.smartcardio.ipc.CardService;
import android.smartcardio.ipc.ICardService;
import android.smartcardio.Card;
import android.smartcardio.CardChannel;
import android.smartcardio.CardException;
import android.smartcardio.CardTerminal;
import android.smartcardio.CommandAPDU;
import android.smartcardio.ResponseAPDU;
import android.smartcardio.TerminalFactory;

import java.io.FileNotFoundException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import java.util.List;


/**
 * Created by Zawer on 1/10/2016.
 */
public class PCSCReader {

    private static final String MANAGEMENT_PACKAGE = "com.hidglobal.cardreadermanager";
    private static final int REQUEST_APP_INSTALL = 48879;
    private static final String MANAGEMENT_APP = "CardReaderManager.apk";

    private ICardService mService;
    private TerminalFactory mFactory;
    private CardChannel channel;
    private Card mCard;


    private String readerName;
    android.smartcardio.ATR ATR;
    private int status;
    private int type;
    private long context;
    private boolean mIsConnected;
    private  Context mParent ;
    public PCSCReader(Context parent) throws  Exception
    {
        this.mParent = parent;
        mService = CustomCardService.getInstance(this.mParent);

    }

    public boolean IsConnected()
    {
        return mIsConnected;
    }
    public  void Disconnect()
    {
        mIsConnected = false;
        try {
            if (this.mCard != null) {
                this.mCard.disconnect(true);
            }
        }
        catch(Exception ex) {
            //
        }
    }
    public void release()
    {
        if (mService !=null) {
            mService.releaseService();
        }
    }

    public  void Connect() throws CardNotPresentException, Exception
    {

        if (mFactory == null) {
            mFactory = mService.getTerminalFactory();
        }



        List<CardTerminal> terminals = mFactory.terminals().list();
        CardTerminal terminal_1 = terminals.get(0);
        Boolean b =terminal_1.isCardPresent();
        android.util.Log.v("Test",b.toString());
        this.mCard = terminal_1.connect("T=0");
        this.ATR  = mCard.getATR();
        this.channel = mCard.getBasicChannel();
        this.mIsConnected=true;
    }


    public String getATR()
    {
        return HexToChar(this.ATR.getBytes());
    }
    public boolean IsUAECard()
    {
        ATR x = this.ATR;
        return true;
    }

    byte[] mProperty0;
    byte[] mProperty1;
    byte[] mProperty2;

    /*WHILE (LEN>0)
    {
        ...
        ..
        READ
        LEN=RESPNOPNSE.GETSW2()
    }*/

    private byte[] getProperty1 () throws Exception
    {
        //-------------------------------------------------------------------------------
        // Select File & get data (Need analysis)
        //------------------------------------------------------------------------------
        ResponseAPDU response;
        response= channel.transmit(new CommandAPDU(new byte[]
                {0x00, (byte)0xA4 , 0x04 , 0x00 , 0x0C , (byte)0xA0 , 0x00 , 0x00 , 0x02 , 0x43 , 0x00 , 0x13 , 0x00 , 0x00, 0x00,0x01,(byte)0xFF}));
        if (response.getSW1()!=0x61)
            throw new Exception("Failed");
        response= channel.transmit(new CommandAPDU(new byte[]{0x00, (byte)0xC0, 0x00, 0x00, (byte)response.getSW2()}));
        if (response.getSW()!=0x9000)
            throw  new Exception("Failed");
        //The Above data must be analyzed to see what it means, later,.................

        //-----------------------------------------------------------------
        // Get Data... Fixed 13Hex bytes (Need anlysis)
        //--------------------------------------------------------------------
        response= channel.transmit(new CommandAPDU(new byte[]{(byte)0x80, (byte)0xCA, 0x01, 0x01, 0x13})); //
        if (response.getSW()!= 0x9000)
            throw new Exception("Failed");
        return response.getData();

    }



    public String getCardSerialNumber() throws  Exception
    {
        //Select first file
        //response = selectFile(channel, new byte[]{0x00, 0x02, 0x43, 0x00, 0x13, 0x00, 0x00, 0x00, 0x01, 0x01});
        ResponseAPDU response = this.channel.transmit( new CommandAPDU(new byte[]{
                0x00,(byte)0xA4 ,0x04 ,0x00 ,0x0C ,(byte)0xA0 ,0x00 ,0x00 ,0x02 ,0x43 ,0x00 ,0x13 ,0x00 ,0x00 ,0x00 ,0x01 ,0x01
        }));
        if (response.getSW1()!=0x61)
            throw new Exception("Response error getting CardSerialNo");
        //read from first file
        response = getResponseStd(channel, response.getSW2()); ;//Not used data for now
        mProperty0 = response.getData().clone();

        response = channel.transmit(new CommandAPDU(new byte[]{(byte)0x80,(byte)0xC0, 0x02, (byte)0xA1, 0x08}));
        if (response.getSW() != 0x9000)
            throw new Exception("Failed to get Card serial no");
        return HexToChar(response.getData());
    }


    public  EidPublicData getPublicData() throws  Exception
    {
        EidPublicData eid = new EidPublicData();

        getProperty1(); //For future analysis
        eid.setIDNumber(this.getIdNumber());
        setPublicData(eid);
        setPublicData(eid);
        return eid;
    }

    private int getNextZero(byte[] data, int startFrom)
    {
        for(int i=startFrom; i<data.length; i++)
        {
            if((int)data[i]==0) {
               return i;
            }
        }
        return -1;
    }


    final static int ISSUE_DATE_OFFS = 14;
    final static int EXPIRY_DATE_OFFS = 22;
    final static int BIRTH_DATE_OFFS =  157;
    final static int ARABIC_FULL_NAME_OFFS = 34;
    final static int ENGLISH_FULL_NAME_OFFS = 82;
    final static int SEX_OFFS = 119;
    final static int ARABIC_NATIONALITY_OFFS = 124;
    final static int ENGLISH_NATIONALITY_OFFS = 140;
    final static int NATIONALITY_CODE_OFFS = 0x8F;
    final static int ID_TYPE_OFFS = 8;

    private final Charset UTF8_CHARSET = Charset.forName("UTF-8");

    private void setPublicData(EidPublicData eid) throws  Exception {

        ResponseAPDU response;
        response = channel.transmit(new CommandAPDU(new byte[]
                {0x00, (byte) 0xA4, 0x00, 0x00, 0x02, 0x02, 0x03}));
        if (response.getSW1() != 0x61)
            throw new Exception("Failed");
        response = channel.transmit(new CommandAPDU(new byte[]{0x00, (byte) 0xC0, 0x00, 0x00, (byte) response.getSW2()}));
        if (response.getSW() != 0x9000)
            throw new Exception("Failed");
        mProperty2 = response.getData().clone();

        //Read real data
        response = channel.transmit(new CommandAPDU(new byte[]{0x00, (byte) 0xB0, 0x00, 0x00, (byte) 0xE6}));
        if (response.getSW() != 0x9000)
            throw new Exception("Failed to read public data v1");

        byte[] data = response.getData(); //Reference to data
        int nexIndex = 0;
        int endIndex = ARABIC_FULL_NAME_OFFS - 2;


        int startIndex = getNextZero(data, 0);
        int length = data[startIndex + 1];

        int typeId = 0;

        while(startIndex < data.length) {
            if(length == 0) {
                startIndex = getNextZero(data, startIndex);
                length = data[startIndex + 1];
            }

            byte[] tobeExtracted = new byte[length];

            System.arraycopy(data, startIndex + 2, tobeExtracted, 0, length);

            switch (typeId) {
                case 1:
                    eid.setIssueDate(Utils.CharArrayToStringDate(Utils.ToCharArray(tobeExtracted)));
                    break;
                case 2:
                    eid.setExpiryDate(Utils.CharArrayToStringDate(Utils.ToCharArray(tobeExtracted)));
                    break;
                case 4:
                    eid.setArabicFullName(Utils.CharArrayToUTF8String(Utils.ToCharArray(tobeExtracted)));
                    break;
                case 6:
                    eid.setFullName(Utils.CharArrayToUTF8String(Utils.ToCharArray(tobeExtracted)));
                    break;
                case 7:
                    eid.setSex(Utils.CharArrayToUTF8String(Utils.ToCharArray(tobeExtracted)));
                    break;
                case 10:
                    eid.setNationality(Utils.CharArrayToUTF8String(Utils.ToCharArray(tobeExtracted)));
                    break;
                case 11:
                    eid.setDateOfBirth(Utils.CharArrayToStringDate(Utils.ToCharArray(tobeExtracted)));
                    break;

            }

            if(typeId >= 13)
                break;





            startIndex = getNextZero(data, startIndex + 2);
            length = data[startIndex + 1];
            typeId = typeId + 1;
        }

        //Read real data
        response = channel.transmit(new CommandAPDU(new byte[]{0x00, (byte) 0xB0, 0x00, 0x00, (byte) 0xE6}));
        if (response.getSW() != 0x9000)
            throw new Exception("Failed to read public data v1");

     data = response.getData(); //Reference to data
byte a = data[0];

        /*int index = 0;
String transformed = new String(data, UTF8_CHARSET);*/

        //---- ISSUE DATE -------------------------------------------------------
        /*{

            String text = HexToChar(data);

            index = getNextZero(data, index);




            endIndex = getNextZero(data, index + 1);

            int length = endIndex - nexIndex;

            byte[] date1 = new byte[length];
            System.arraycopy(data, index+2, date1, 0, length);
            eid.setIssueDate(Utils.CharArrayToStringDate(Utils.ToCharArray(date1)));

            //---- ISSUE DATE -------------------------------------------------------
            System.arraycopy(data, EXPIRY_DATE_OFFS, date1, 0, date1.length);
            eid.setExpiryDate(Utils.CharArrayToStringDate(Utils.ToCharArray(date1)));

            //---- BIRTH DATE -------------------------------------------------------
            System.arraycopy(data, BIRTH_DATE_OFFS, date1, 0, date1.length);
            eid.setDateOfBirth(Utils.CharArrayToStringDate(Utils.ToCharArray(date1)));
        }
        //---- ARABIC NAME -----------------------------------------------------------------
        /*{
            int endIndex = getNextZero(data, ARABIC_FULL_NAME_OFFS);
            int length = endIndex - ARABIC_FULL_NAME_OFFS;

            //byte[] arabic_name = new byte[data[ARABIC_FULL_NAME_OFFS - 1]];
            byte[] arabic_name = new byte[length];
            System.arraycopy(data, ARABIC_FULL_NAME_OFFS, arabic_name, 0, arabic_name.length);
            eid.setArabicFullName(Utils.CharArrayToUTF8String(Utils.ToCharArray(arabic_name)));

            nexIndex = getNextNonZero(data, endIndex + 1);
        }*/
        //---- ENGLISH NAME
        /*{

            int endIndex = getNextZero(data, nexIndex);
            int length = endIndex - nexIndex;


            byte[] english_name = new byte[length];
            System.arraycopy(data, nexIndex, english_name, 0, english_name.length);
            eid.setFullName(Utils.CharArrayToUTF8String(Utils.ToCharArray(english_name)));
        }*/
        //--- NATIONALITY CODE-------------------------------------------------------------
       /* {
            byte[] nationalityCode = new byte[NATIONALITY_CODE_OFFS - 1];

            //int destIndex = data.length - NATIONALITY_CODE_OFFS - 1;



            System.arraycopy(data, NATIONALITY_CODE_OFFS, nationalityCode, 0, 3);
            String nationality = Utils.CharArrayToUTF8String(Utils.ToCharArray(nationalityCode));
            eid.setNationality(nationality);
        }
        //--- sex ---------------------------------------------------------------------------
        {
            byte[] sex = new byte[]{data[SEX_OFFS]};
            eid.setSex(Utils.CharArrayToUTF8String(Utils.ToCharArray(sex)));
        }
        //-- ID Type ----------------------------------------------------------
        {
            byte[] idType = new byte[ID_TYPE_OFFS-1];
            System.arraycopy(data, ENGLISH_FULL_NAME_OFFS, idType, 0, idType.length);
            eid.setIDType(Utils.CharArrayToUTF8String(Utils.ToCharArray(idType)));
        }*/

        android.util.Log.v("Done with public data", "Public data has been converted successfully");
    }



    private String getIdNumber() throws Exception
    {
        ResponseAPDU response;


        response= channel.transmit(new CommandAPDU(new byte[]{0x00 ,(byte)0xA4 ,0x04 ,0x00 ,0x0C ,(byte)0xA0 ,0x00 ,0x00 ,0x02 ,0x43 ,0x00 ,0x13 ,0x00 ,0x00 ,0x00 ,0x01 ,0x01}));
        if (response.getSW1()!= 0x61)
            throw new Exception("Failed");

        response= channel.transmit(new CommandAPDU(new byte[]{0x00, (byte)0xC0, 0x00, 0x00, (byte)response.getSW2()}));

        //select file
        response= channel.transmit(new CommandAPDU(new byte[]{0x00, (byte)0xA4, 0x00, 0x00, 0x02, 0x02, 0x01}));
        if (response.getSW1() != 0x61)
            throw new Exception("Failed");



        //Get data--
        response = channel.transmit(new CommandAPDU(new byte[]{0x00,(byte)0xC0, 0x00, 0x00, (byte)response.getSW2()}));


        //Read Binary B0
        response= channel.transmit(new CommandAPDU(new byte[]{0x00, (byte)0xB0, 0x00, 0x00}));
        

        response = channel.transmit(new CommandAPDU(new byte[]{0x00, (byte)0xB0, 0x00, 0x00, (byte)response.getSW2()}));
        if (response.getSW() != 0x9000)
            throw new Exception("Failed to read Id Number");
        int len = response.getData()[7];
        byte[] idBytes = new byte[len];
        System.arraycopy(response.getData(),8,idBytes,0, len);
        String result ="";
        for (int i=0; i<idBytes.length; i++) {
            result += Character.toString((char)idBytes[i]);
        };
        return result.toString();
    }



    private static final char[] HEX_TABLE = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
    public final String HexToChar(byte[] data) {
        StringBuilder s = new StringBuilder();
        if(data != null) {
            if(data.length != 0) {
                s = new StringBuilder(data.length*2);
                for(int i = 0; i < data.length; ++i) {
                    s.append(HEX_TABLE[data[i] >>> 4 & 0x0f]);
                    s.append(HEX_TABLE[data[i] & 15]);
                }
            }
        }
        return s.toString();
    }




    private ResponseAPDU getResponseStd(CardChannel channel, int len) throws  Exception
    {
        try {
            byte[] commandBytes = new byte[]{0x00, (byte) 0xC0, 0x00, 0x00, (byte)len};
            return channel.transmit(new CommandAPDU(commandBytes));
        }
        catch (Exception ex)
        {
            throw new Exception("Could not get response,,,");
        }
    }

    private ResponseAPDU selectFile(CardChannel channel, byte[] fileId) throws CardException,FileNotFoundException {

        byte[] commandBytes = new byte[]{0x00, (byte)0xA4, 0x04, 0x0C,(byte)fileId.length,0x00};

        byte[] selectFileBytes = new byte[commandBytes.length + fileId.length];
        System.arraycopy(commandBytes,0,selectFileBytes ,0, commandBytes.length);
        System.arraycopy(fileId,0,selectFileBytes ,commandBytes.length, fileId.length);
        CommandAPDU selectFileApdu = new CommandAPDU(selectFileBytes);
        ResponseAPDU responseApdu = channel.transmit(selectFileApdu);
        if (0x9000 != responseApdu.getSW() && 0x61 != responseApdu.getSW1()) {
            throw new FileNotFoundException(
                    "wrong status word after selecting file: " + Integer.toHexString(responseApdu.getSW()));
        }
        try {
            // Prevent SHARING VIOLATION fix
            Thread.sleep(20);
        } catch (InterruptedException e) {
            throw new RuntimeException("sleep error: " + e.getMessage());
        }
        return responseApdu;
    }

}
