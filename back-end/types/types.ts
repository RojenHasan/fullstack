export type DoctorInput = {
    id?: number;
    name?: string;
    user?: UserInput;
    experience?: string;
    availability?: string;
}
export type UserInput = {
    id?: number;
    password?: string
    email?: string
    role? : string
}

export type PatientInput = {
    id?: number;
    user?: UserInput;
    name?: string;
    medical_History?: string;
    street?: string;
    postcode?: number;
    housenr?: number;
    stad?: string;
}
export type AppointmentInput = {
    id?: number
    date?: Date
    time?: Date
    doctor?: DoctorInput
    patient?: PatientInput
    medicalRecord?: MedicalRecordInput
    medicalTests?: MedicalTestInput[]

}
export type MedicalRecordInput = {
    id?: number;
    diagnosis?: string;
    treatment?: string
    date?: Date
    patient?: PatientInput
    doctor?: DoctorInput
}
export type MedicalTestInput = {
    id?: number
    name?: string
    cost?: number
    description?: string
    patient?: PatientInput
    doctor?: DoctorInput
}

