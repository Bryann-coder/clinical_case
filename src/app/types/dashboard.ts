export type PatientStatus = "Discharged" | "Report Pending" | "ICU" | "In Recovery" | "Life Support";
export type ContactMethod = "phone" | "chat" | "email";
export type CaseStatus = 'En attente' | 'Validé' | 'Rejeté';
export type CaseDifficulty = 'Débutant' | 'Intermédiaire' | 'Avancé';

export interface Patient {
  id: number;
  admittedDate: string;
  name: string;
  room: string;
  areaOfConcern: string;
  inCharge: string;
  status: PatientStatus;
  contactMethod: ContactMethod;
}


// Structure pour un cas clinique de base
export interface ClinicalCase {
  id: string;
  pathology: string;
  difficulty: CaseDifficulty;
  generatedDate: string;
  generatedBy: {
    name: string;
    avatarUrl?: string;
  };
}

// Étendre la structure pour les cas rejetés
export interface RejectedCase extends ClinicalCase {
  rejectionReason: string;
  rejectedDate: string;
}

// Étendre la structure pour les cas validés
export interface ValidatedCase extends ClinicalCase {
  validatedDate: string;
  expertValidator: string;
}