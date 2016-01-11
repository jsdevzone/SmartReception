package com.smartreception.eid;

import java.util.Date;

/**
 * Created by Zawer on 1/10/2016.
 */
public class EidPublicData {

    private char[] Photography_DataSigned;
    private char[] CardHolderData_SF3_DataSigned;
    private char[] CardHolderData_SF5_DataSigned;
    private char[] Photography_Signature;

    private char[] CardHolderData_SF3_Signature;
    private char[] CardHolderData_SF5_Signature;
    private char[] Photography;

    private String CardNumber;
    private String IDNumber;
    private String IDType;
    private String IssueDate;
    private String ExpiryDate;
    private String ArabicTitle;
    private String ArabicFullName;
    private String Title;
    private String FullName;
    private String Sex;
    private String ArabicNationality;
    private String Nationality;
    private String DateOfBirth;
    private String ArabicMotherFirstName;
    private String MotherFirstName;
    private String Occupation;
    private String MaritalStatus;
    private String FamilyID;
    private String HusbandIDN;
    private int SponsorType;
    private String SponsorNumber;
    private String SponsorName;
    private String ResidencyType;
    private String ResidencyNumber;
    private String ResidencyExpiryDate;
    private String MOIRootCertificate;

    public EidPublicData() {
    }

    public String getArabicFullName() {
        return this.ArabicFullName;
    }

    public void setArabicFullName(String arabicFullName) {
        this.ArabicFullName = arabicFullName;
    }

    public String getArabicMotherFirstName() {
        return this.ArabicMotherFirstName;
    }

    public void setArabicMotherFirstName(String arabicMotherFirstName) {
        this.ArabicMotherFirstName = arabicMotherFirstName;
    }

    public String getArabicNationality() {
        return this.ArabicNationality;
    }

    public void setArabicNationality(String arabicNationality) {
        this.ArabicNationality = arabicNationality;
    }

    public String getArabicTitle() {
        return this.ArabicTitle;
    }

    public void setArabicTitle(String arabicTitle) {
        this.ArabicTitle = arabicTitle;
    }

    public char[] getCardHolderData_SF3_DataSigned() {
        return this.CardHolderData_SF3_DataSigned;
    }

    public void setCardHolderData_SF3_DataSigned(char[] cardHolderData_SF3_DataSigned) {
        this.CardHolderData_SF3_DataSigned = cardHolderData_SF3_DataSigned;
    }

    public char[] getCardHolderData_SF3_Signature() {
        return this.CardHolderData_SF3_Signature;
    }

    public void setCardHolderData_SF3_Signature(char[] cardHolderData_SF3_Signature) {
        this.CardHolderData_SF3_Signature = cardHolderData_SF3_Signature;
    }

    public char[] getCardHolderData_SF5_DataSigned() {
        return this.CardHolderData_SF5_DataSigned;
    }

    public void setCardHolderData_SF5_DataSigned(char[] cardHolderData_SF5_DataSigned) {
        this.CardHolderData_SF5_DataSigned = cardHolderData_SF5_DataSigned;
    }

    public char[] getCardHolderData_SF5_Signature() {
        return this.CardHolderData_SF5_Signature;
    }

    public void setCardHolderData_SF5_Signature(char[] cardHolderData_SF5_Signature) {
        this.CardHolderData_SF5_Signature = cardHolderData_SF5_Signature;
    }

    public String getCardNumber() {
        return this.CardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.CardNumber = cardNumber;
    }

    public String getDateOfBirth() {
        return this.DateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.DateOfBirth = dateOfBirth;
    }

    public String getExpiryDate() {
        return this.ExpiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.ExpiryDate = expiryDate;
    }

    public String getFamilyID() {
        return this.FamilyID;
    }

    public void setFamilyID(String familyID) {
        this.FamilyID = familyID;
    }

    public String getFullName() {
        return this.FullName;
    }

    public void setFullName(String fullName) {
        this.FullName = fullName;
    }

    public String getHusbandIDN() {
        return this.HusbandIDN;
    }

    public void setHusbandIDN(String husbandIDN) {
        this.HusbandIDN = husbandIDN;
    }

    public String getIDNumber() {
        return this.IDNumber;
    }

    public void setIDNumber(String number) {
        this.IDNumber = number;
    }

    public String getIDType() {
        return this.IDType;
    }

    public void setIDType(String type) {
        this.IDType = type;
    }

    public String getIssueDate() {
        return this.IssueDate;
    }

    public void setIssueDate(String issueDate) {
        this.IssueDate = issueDate;
    }

    public String getMaritalStatus() {
        return this.MaritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.MaritalStatus = maritalStatus;
    }

    public String getMOIRootCertificate() {
        return this.MOIRootCertificate;
    }

    public void setMOIRootCertificate(String rootCertificate) {
        this.MOIRootCertificate = rootCertificate;
    }

    public String getMotherFirstName() {
        return this.MotherFirstName;
    }

    public void setMotherFirstName(String motherFirstName) {
        this.MotherFirstName = motherFirstName;
    }

    public String getNationality() {
        return this.Nationality;
    }

    public void setNationality(String nationality) {
        this.Nationality = nationality;
    }

    public String getOccupation() {
        return this.Occupation;
    }

    public void setOccupation(String occupation) {
        this.Occupation = occupation;
    }

    public char[] getPhotography() {
        return this.Photography;
    }

    public void setPhotography(char[] photography) {
        this.Photography = photography;
    }

    public char[] getPhotography_DataSigned() {
        return this.Photography_DataSigned;
    }

    public void setPhotography_DataSigned(char[] photography_DataSigned) {
        this.Photography_DataSigned = photography_DataSigned;
    }

    public char[] getPhotography_Signature() {
        return this.Photography_Signature;
    }

    public void setPhotography_Signature(char[] photography_Signature) {
        this.Photography_Signature = photography_Signature;
    }

    public String getResidencyExpiryDate() {
        return this.ResidencyExpiryDate;
    }

    public void setResidencyExpiryDate(String residencyExpiryDate) {
        this.ResidencyExpiryDate = residencyExpiryDate;
    }

    public String getResidencyNumber() {
        return this.ResidencyNumber;
    }

    public void setResidencyNumber(String residencyNumber) {
        this.ResidencyNumber = residencyNumber;
    }

    public String getResidencyType() {
        return this.ResidencyType;
    }

    public void setResidencyType(String residencyType) {
        this.ResidencyType = residencyType;
    }

    public String getSex() {
        return this.Sex;
    }

    public void setSex(String sex) {
        this.Sex = sex;
    }

    public String getSponsorName() {
        return this.SponsorName;
    }

    public void setSponsorName(String sponsorName) {
        this.SponsorName = sponsorName;
    }

    public String getSponsorNumber() {
        return this.SponsorNumber;
    }

    public void setSponsorNumber(String sponsorNumber) {
        this.SponsorNumber = sponsorNumber;
    }

    public int getSponsorType() {
        return this.SponsorType;
    }

    public void setSponsorType(int sponsorType) {
        this.SponsorType = sponsorType;
    }

    public String getTitle() {
        return this.Title;
    }

    public void setTitle(String title) {
        this.Title = title;
    }

}
