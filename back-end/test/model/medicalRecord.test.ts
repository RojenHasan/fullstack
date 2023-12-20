import { da } from "date-fns/locale";
import { Doctor } from "../../domain/model/doctor";
import { MedicalRecord } from "../../domain/model/medicalRecord";
import { Patient } from "../../domain/model/patient";
import { User } from "../../domain/model/user";

const date = new Date(2021, 11, 17)
const user = new User({id:1, email:'rojin@gmail.com',password:'123'});

const doctor: Doctor = new Doctor({id: 1,user,name: "Rojin",experience: "123",availability: "123"});
const patient = new Patient({id: 1, user:user, name:"rojin", medical_History:"bla", street:"Atten", postcode:3400, housenr:93, stad:"leuven"});

test('given: valid values for medicalRecord, when: medicalRecord is created, then: medicalRecord is createde with those values', () => {
    const diagnosis = "bla";
    const treatment = "bla";

    const medicalRecord = 
    new MedicalRecord({id:1, diagnosis:diagnosis,treatment:"bla", date: date,patient: patient ,doctor: doctor })
    
    expect(medicalRecord.diagnosis).toEqual(diagnosis);
    expect(medicalRecord.treatment).toEqual(treatment);
    expect(medicalRecord.date).toEqual(date);
    expect(medicalRecord.patient).toEqual(patient);
    expect(medicalRecord.doctor).toEqual(doctor);
})