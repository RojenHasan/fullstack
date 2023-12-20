import { Appointment } from "../../domain/model/appointment";
import { Doctor } from "../../domain/model/doctor";
import { MedicalRecord } from "../../domain/model/medicalRecord";
import { MedicalTest } from "../../domain/model/medicalTest";
import { Patient } from "../../domain/model/patient";
import { User } from "../../domain/model/user";

const date = new Date(2021, 11, 17)
const time = new Date('December 17, 2021 04:28:00')
const user = new User({id:1, email:'rojin@gmail.com',password:'123'});

const doctor = new Doctor({id: 1,user,name: "Rojin",experience: "123",availability: "123"});
const patient = new Patient({id: 1, user:user, name:"rojin", medical_History:"bla", street:"Atten", postcode:3400, housenr:93, stad:"leuven"});
const medicalRecord = 
new MedicalRecord({id:1, diagnosis:"bla",treatment:"bla", date: date,patient: patient ,doctor: doctor })
const medicalTest = new MedicalTest({id:1, name:"bla", cost:20.2, description:"bla", patient: patient,doctor:doctor})

test('given: valid values for appointment, when: appointment is created, then: appointment is createde with those values', () => {
    const appointment = new Appointment({id:1, date: date, time: time, patient: patient, doctor:doctor, medicalRecord:medicalRecord, medicalTests:[medicalTest]});

    expect(appointment.date).toEqual(date);
    expect(appointment.time).toEqual(time);
    expect(appointment.patient).toEqual(patient);
    expect(appointment.doctor).toEqual(doctor);
    expect(appointment.medicalRecord).toEqual(medicalRecord);
    expect(appointment.medicalTests).toContain(medicalTest);
    expect(appointment.id).toEqual(1);
});

test('given: an existing appointment, when: adding a medicalTest to appointment, then: medicalTest is adding for appointment', () => {
    const appointment = new Appointment({id:1, date: date, time: time, patient: patient, doctor:doctor, medicalRecord:medicalRecord, medicalTests:[medicalTest]});
    const medicalTest2 = new MedicalTest({id:1, name:"blabla", cost:40.2, description:"bla", patient: patient,doctor:doctor})
    
    appointment.addMedicalTestToAppointment(medicalTest2);
    //then
    expect(appointment.medicalTests).toContain(medicalTest)
    expect(appointment.medicalTests).toContain(medicalTest2)
})