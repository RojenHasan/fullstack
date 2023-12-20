import { Doctor } from "../../domain/model/doctor";
import { User } from "../../domain/model/user";


const user = new User({id:1, email:'rojin@gmail.com',password:'123'});
const availability= "123"
const experience="123"
const name = "rojin"

test('given: valid values for doctor, when: doctor is created, then: doctor is createde with those values', () => {
  const doctor: Doctor = new Doctor({id: 1,user,name:name ,experience: experience,availability: availability});
  expect(doctor.availability).toEqual(availability);
  expect(doctor.experience).toEqual(experience);
  expect(doctor.id).toEqual(1);
  expect(doctor.name).toEqual(name);
  expect(doctor.user).toEqual(user);
});

test('given: invalid value for doctor name, when: doctor is created, then: error is thrown', () => {
  expect(() => new Doctor({id: 1,user,name:"" ,experience: experience,availability: availability})).toThrow('Doctor name is required');
});

test('given: invalid value for doctor experience, when: doctor is created, then: error is thrown', () => {
  expect(() => new Doctor({id: 1,user,name:name ,experience: "",availability: availability})).toThrow('Doctor experience is required');

});

test('given: invalid value for doctor availability, when: doctor is created, then: error is thrown', () => {
  expect(() => new Doctor({id: 1,user,name:name ,experience: experience,availability: ""})).toThrow('Doctor availability is required');
});
