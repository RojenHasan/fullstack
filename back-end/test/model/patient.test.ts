import { Patient } from "../../domain/model/patient";
import { User } from "../../domain/model/user";

const user = new User({id:1, email:'rojin@gmail.com',password:'123'});
const name= "rojin"
const history= "bla"
const street= "atten"
const postcode= 3400
const stad = "leuven"
const num = 44
test('given: valid values for patient, when: patient is created, then: patient is createde with those values', () => {
    const patient = new Patient({id: 1, user:user, name:name, medical_History:history, street:street, postcode:postcode, housenr:num, stad: stad})

    expect(patient.user).toEqual(user);
    expect(patient.stad).toEqual(stad);
    expect(patient.housenr).toEqual(num);
    expect(patient.street).toEqual(street);
    expect(patient.name).toEqual(name);
    expect(patient.postcode).toEqual(postcode);
    expect(patient.medical_History).toEqual(history);
})