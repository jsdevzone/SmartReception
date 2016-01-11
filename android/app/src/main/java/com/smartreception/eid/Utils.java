package com.smartreception.eid;

/**
 * Created by Zawer on 1/11/2016.
 */

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.Vector;
import android.util.Base64;


public class Utils {
    static char[] hexval = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};

    public Utils() {
    }

    public static String CharArrayToHex(char[] buf, String delimiter) {
        if (buf == null) {
            return null;
        } else {
            StringBuffer _hex2 = new StringBuffer();

            for (int i = 0; i < buf.length; ++i) {
                _hex2.append(hexval[buf[i] >> 4 & 15]);
                _hex2.append(hexval[buf[i] & 15]);
                if (delimiter != null && i < buf.length - 1) {
                    _hex2.append(delimiter);
                }
            }

            return _hex2.toString();
        }
    }

    public static String CharArrayToHex(char[] buf) {
        return CharArrayToHex(buf, " ");
    }

    public static byte[] ToByteArray(char[] buf) {
        if (buf == null) {
            return null;
        } else {
            byte[] bb = new byte[buf.length];

            for (int i = 0; i < bb.length; ++i) {
                bb[i] = (byte) buf[i];
            }

            return bb;
        }
    }

    public static String CharArrayToUTF8String(char[] buf) {
        try {
            return new String(ToByteArray(buf), "UTF-8");
        } catch (Exception var2) {
            return null;
        }
    }

    public static String CharArrayToStringDate(char[] buf) {
        return buf != null && buf.length == 4 ? CharToHex(buf[3]) + "/" + CharToHex(buf[2]) + "/" + CharToHex(buf[0]) + CharToHex(buf[1]) : "";
    }

    public static String CharToHex(char c) {
        String _hex2 = "";
        _hex2 = _hex2 + hexval[c >> 4 & 15];
        _hex2 = _hex2 + hexval[c & 15];
        return _hex2;
    }

    public static char[] ToCharArray(byte[] buf) {
        if (buf == null) {
            return null;
        } else {
            char[] bb = new char[buf.length];

            for (int i = 0; i < bb.length; ++i) {
                bb[i] = (char) buf[i];
            }

            return bb;
        }
    }

    public static int[] ToIntArray(char[] buf) {
        int[] bb = new int[buf.length];

        for (int i = 0; i < bb.length; ++i) {
            bb[i] = buf[i];
        }

        return bb;
    }

    public static char[] HexToCharArray(String text) {
        if (text == null) {
            return null;
        } else {
            try {
                text = text.replaceAll(" ", "");
                return ToCharArray(HexBin.decode(text));
            } catch (Exception var2) {
                System.out.println("Exception occured : " + var2.getMessage());
                return null;
            }
        }
    }

    public static char[] Base64ToCharArray(String text) {
        if (text == null) {
            return null;
        } else {
            try {
                text = text.replace(" ", "+");
                //byte[] e =  (new BASE64Decoder()).decodeBuffer(text);
                byte[] e = Base64.decode(text,0);
                return ToCharArray(e);
            } catch (Exception ex) {
                return null;
            }
        }
    }

    public static byte[] Base64ToByteArray(String text) throws IOException {
        if (text == null) {
            return null;
        } else {
            text = text.replace(" ", "+");
            return Base64.decode(text, 0);
            //return (new BASE64Decoder()).decodeBuffer(text);
        }
    }

    public static String CharArrayToBase64(char[] buf) {

        //return buf == null ? null : (new BASE64Encoder()).encode(ToByteArray(buf));
        return buf == null ? null : (Base64.encodeToString(ToByteArray(buf), 0));
    }

    public static String ByteArrayToBase64(byte[] buf) {
        //return buf == null ? null : (new BASE64Encoder()).encode(buf);
        return buf == null ? null : (Base64.encodeToString(buf, 0));
    }

    public static byte[] HexToByteArray(String text) {
        if (text == null) {
            return null;
        } else {
            text = text.replaceAll(" ", "");
            return HexBin.decode(text);
        }
    }

    public static String ByteArrayToHex(byte[] buf, String delimiter) {
        if (buf == null) {
            return null;
        } else {
            StringBuffer _hex2 = new StringBuffer();

            for (int i = 0; i < buf.length; ++i) {
                _hex2.append(hexval[buf[i] >> 4 & 15]);
                _hex2.append(hexval[buf[i] & 15]);
                if (delimiter != null && i < buf.length - 1) {
                    _hex2.append(delimiter);
                }
            }

            return _hex2.toString();
        }
    }

    public static String ByteArrayToHex(byte[] buf) {
        if (buf == null) {
            return null;
        } else {
            StringBuffer _hex2 = new StringBuffer();

            for (int i = 0; i < buf.length; ++i) {
                _hex2.append(hexval[buf[i] >> 4 & 15]);
                _hex2.append(hexval[buf[i] & 15]);
            }

            return _hex2.toString();
        }
    }

    public static String ByteToHex(byte input) {
        StringBuffer _hex2 = new StringBuffer();
        _hex2.append(hexval[input >> 4 & 15]);
        _hex2.append(hexval[input & 15]);
        return _hex2.toString();
    }

    public static char[] ReadAllChars(String path) {
        File f = new File(path);
        byte[] b = new byte[(int) f.length()];

        try {
            FileInputStream fis = new FileInputStream(f);
            fis.read(b);
            return ToCharArray(b);
        } catch (Exception var5) {
            var5.printStackTrace();
            return null;
        }
    }

    public static void WriteToFile(char[] value, String path) {
        try {
            File ex = new File(path);
            FileOutputStream fpFile = new FileOutputStream(ex);
            OutputStreamWriter writer = new OutputStreamWriter(fpFile);
            writer.write(value);
            writer.close();
        } catch (FileNotFoundException var5) {
            var5.printStackTrace();
        } catch (IOException var6) {
            var6.printStackTrace();
        }

    }

    public static byte[] ReadAllBytes(String path) {
        File f = new File(path);
        byte[] b = new byte[(int) f.length()];

        try {
            FileInputStream fis = new FileInputStream(f);
            fis.read(b);
            return b;
        } catch (Exception var5) {
            var5.printStackTrace();
            return null;
        }
    }

    public static void WriteAllBytes(byte[] value, String path) {
        try {
            File ex = new File(path);
            FileOutputStream fpFile = new FileOutputStream(ex);
            fpFile.write(value);
            fpFile.close();
        } catch (FileNotFoundException var4) {
            var4.printStackTrace();
        } catch (IOException var5) {
            var5.printStackTrace();
        }

    }

    public static void main(String[] args) {
        char[] cc = ReadAllChars("c:\\image.raw");
        System.out.println(cc.length);
        char[] ccc = HexToCharArray(new String(cc));
        System.out.println(ccc.length);
    }

    public static Vector<byte[]> split(byte[] b, int partSize) {
        Vector blocks = new Vector();

        for (int start = 0; start < b.length; start += partSize) {
            blocks.add(Arrays.copyOfRange(b, start, Math.min(start + partSize, b.length)));
        }

        return blocks;
    }

    public static byte[] mergeByteArrays(byte[] array1, byte[] array2) {
        if (array1 == null) {
            return array2;
        } else if (array2 == null) {
            return array1;
        } else {
            byte[] result = new byte[array1.length + array2.length];
            int ind = 0;

            int i;
            for (i = 0; i < array1.length; ++i) {
                result[ind++] = array1[i];
            }

            for (i = 0; i < array2.length; ++i) {
                result[ind++] = array2[i];
            }

            return result;
        }
    }
}