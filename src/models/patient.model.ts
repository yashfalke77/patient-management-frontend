export interface PatientSchema {
    email?: string | null;
    phoneNumber?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    userId?: string | null;
    privacyConsent?: boolean | null;
    gender?: string | null;
    dateOfBirth?: string | Date | null;      // ← updated
    registeredDate?: string | Date | null;   // ← updated
    address?: string | null;
    occupation?: string | null;
    emergencyContactName?: string | null;
    emergencyContactNumber?: string | null;
    insuranceProvider?: string | null;
    insurancePolicyNo?: string | null;
    allergies?: string | null;
    currentMedication?: string | null;
    FamilyMedicalHistory?: string | null;
    pastMedicalHistory?: string | null;
    identificationType?: string | null;
    identificationNumber?: string | null;
    identificationDocumentUrl?: string | null;
    PrimaryPhysician?: string | null;
    Id?: string | null;
    treatmentConsent: boolean;
    disclosureConsent: boolean;
}