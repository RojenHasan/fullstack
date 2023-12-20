import { Doctor } from "../../domain/model/doctor";
import { MedicalTest } from "../../domain/model/medicalTest";
import { Patient } from "../../domain/model/patient";
import { User } from "../../domain/model/user";

const user = new User({id:1, email:'rojin@gmail.com',password:'123'});
const doctor = new Doctor({id: 1,user,name: "Rojin",experience: "123",availability: "123"});
const patient = new Patient({id: 1, user:user, name:"rojin", medical_History:"bla", street:"Atten", postcode:3400, housenr:93, stad:"leuven"});
const name = "rojin"
const cost = 40.2
const des = "bla"
test('given: valid values for MedicalTest, when: MedicalTest is created, then: MedicalTest is createde with those values', () => {
    const medicalTest = new MedicalTest({id:1, name:name, cost:cost, description:des, patient: patient,doctor:doctor})
    expect(medicalTest.name).toEqual(name);
    expect(medicalTest.cost).toEqual(cost);
    expect(medicalTest.description).toEqual(des);
    expect(medicalTest.patient).toEqual(patient);
    expect(medicalTest.doctor).toEqual(doctor);
})
