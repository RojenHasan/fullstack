/*import doctorService from "../../service/doctor.service";
import { Doctor } from "../../domain/model/doctor";
import { User } from "../../domain/model/user";
import { DoctorInput } from "../../types/types";
import doctorDb from "../../domain/data-access/doctor.db";

// Mock the dependencies of your service
jest.mock('../domain/data-access/doctor.db');
jest.mock('../domain/model/doctor');

describe('DoctorService', () => {
  let mockDoctorDbAddDoctor: jest.SpyInstance;
  let mockDoctorDbDeleteDoctor: jest.SpyInstance;
  let mockDoctorDbUpdateDoctor: jest.SpyInstance;
  let mockDoctorDbGetDoctorById: jest.SpyInstance;

  beforeEach(() => {
    // Create spies for your service's dependencies
    mockDoctorDbAddDoctor = jest.spyOn(doctorDb, 'addDoctor');
    mockDoctorDbDeleteDoctor = jest.spyOn(doctorDb, 'deleteDoctor');
    mockDoctorDbUpdateDoctor = jest.spyOn(doctorDb, 'updateDoctor');
    mockDoctorDbGetDoctorById = jest.spyOn(doctorDb, 'getDoctorById');
  });

  afterEach(() => {
    // Clear all mock calls to ensure independence between tests
    jest.clearAllMocks();
  });

  
 

  test('getDoctorById should return a doctor', async () => {
    // Arrange
    const doctorId = 1;
    const expectedDoctor = new Doctor({
      id: doctorId,
      name: 'Test Doctor',
      user: {
        id: 1,
        email: 'test@example.com',
        password: 'testPassword',
      },
      experience: 'Test Experience',
      availability: 'Test Availability',
    });

    // Mock the database function to return the expected doctor
    mockDoctorDbGetDoctorById.mockResolvedValue(expectedDoctor);

    // Act
    const result = await doctorService.getDoctorById(doctorId);

    // Assert
    expect(result).toEqual(expectedDoctor);
    expect(mockDoctorDbGetDoctorById).toHaveBeenCalledWith({ id: doctorId });
    expect(mockDoctorDbGetDoctorById).toHaveBeenCalledTimes(1);
  });
});
*/
import doctorService from '../../service/doctor.service';
import doctorDB from '../../domain/data-access/doctor.db';
import { Doctor } from '../../domain/model/doctor';
import { User } from '../../domain/model/user';
import { DoctorInput } from '../../types/types';
import bcrypt from 'bcryptjs';

const email = "testing@example.com"


let createDoktorMock: jest.Mock;
let mockDoctorDbGetDoctorById: jest.Mock;
let mockDoctorDbGetAllDoctors: jest.Mock;
let mockDoctorDbGetAllAppointmentsForDoctor: jest.Mock;
let mockDoctorDbUpdateDoctor: jest.Mock;
let mockDoctorDbDeleteDoctor: jest.Mock;


beforeEach(() => {
    createDoktorMock = jest.fn();
    mockDoctorDbGetDoctorById = jest.fn();
    mockDoctorDbGetAllDoctors = jest.fn();
    mockDoctorDbGetAllAppointmentsForDoctor = jest.fn();
    mockDoctorDbUpdateDoctor = jest.fn();
    mockDoctorDbDeleteDoctor = jest.fn();
});


afterEach(() => {
    jest.clearAllMocks();
});

// test('given: valid values for firstname, lastname, email and date of birth; when: profile is created; then: profile is created with those values', async() => {
//     //given
//     profileDb.createProfile = createProfileMock;
//     //when
//     await profileService.createProfile({firstname: validFirstname, lastname: validLastname, email: validEmail, dateOfBirth: validDateOfBirth});
//     //then
//     expect(createProfileMock).toHaveBeenCalledTimes(1);
//     expect(createProfileMock).toHaveBeenCalledWith(new Profile({firstname: validFirstname, lastname: validLastname, email: validEmail, dateOfBirth: validDateOfBirth}));
// });



test('when getting all doctors, then: all doctors are returned', () => {  
    doctorDB.getAllDoctors = mockDoctorDbGetAllDoctors.mockResolvedValue(doctorDB.getAllDoctors());
    doctorService.getAllDoctors();
    expect(mockDoctorDbGetAllDoctors).toHaveBeenCalledTimes(1);
})

test('given: valid value for doktor id, when: getting all appointments for a doctor, then: all appointments for that doctor are returned', () => {
    doctorDB.getAllAppointmentsForDoctor = mockDoctorDbGetAllAppointmentsForDoctor;
    doctorService.getAppointmentsForDoctor(5);
    expect(mockDoctorDbGetAllAppointmentsForDoctor).toHaveBeenCalledTimes(1);
})


test('given: valid values, when: updating a doctor, then: the updated doctor is returned', async () => {

    doctorDB.updateDoctor = mockDoctorDbUpdateDoctor;

    const expectedDoctor: Doctor = {
        availability: "1",
        experience: "1",
        id: 5,
        name: "doctor",
        user: { email: email, password: "$2a$12$C.X8qtRjl99bD5lDlACuR.RipvIMjj28Cimgmjw1G.9ft1Gx/YN1K" }}
    doctorDB.updateDoctor = mockDoctorDbUpdateDoctor.mockResolvedValue(expectedDoctor);

    const doktor = await doctorService.updateDoctor({id:5,name:"Rojin",experience:"123",availability:"123",user:{email:email,password:"123"}})
    expect(mockDoctorDbUpdateDoctor).toHaveBeenCalledWith({id:5,name:"Rojin",experience:"123",availability:"123",user:{email:email,password:"123"}});
    expect(doktor).toEqual(expectedDoctor);
})


    describe('getDoctorById', () => {
        it('should return a doctor with the given id', async () => {
            const expectedDoctor: Doctor = {
                availability: "1",
                experience: "1",
                id: 5,
                name: "doctor",
                user: { email: "doctor@doctor.com", id: 1, password: "$2a$12$C.X8qtRjl99bD5lDlACuR.RipvIMjj28Cimgmjw1G.9ft1Gx/YN1K" }
            };
            doctorDB.getDoctorById = mockDoctorDbGetDoctorById.mockResolvedValue(expectedDoctor);
            const doctor = await doctorService.getDoctorById(5);
            expect(doctor).toEqual(expectedDoctor);
            expect(mockDoctorDbGetDoctorById).toHaveBeenCalledTimes(1);
        });
    });

    describe('addDoctor', () => {
        it('should add a doctor and return the added doctor', async () => {
            const doctorInput: DoctorInput = { name: 'John Doe', experience: '5 years', availability: 'Mon-Fri', user: { email: email, password: 'password' } };
            const expectedDoctor: Doctor = { id: 1, name: 'John Doe', experience: '5 years', availability: 'Mon-Fri', user: { email: email, password: 'password' } };
            doctorDB.addDoctor = createDoktorMock;
            createDoktorMock.mockResolvedValue(expectedDoctor);
            const doctor = await doctorService.addDoctor(doctorInput);
            expect(doctor).toEqual(expectedDoctor);
            expect(createDoktorMock).toHaveBeenCalledTimes(1);
            expect(createDoktorMock).toHaveBeenCalledWith(doctorInput);
        });
    });

    describe('deleteDoctor', () => {
        it('should delete a doctor with the given id and return the deleted doctor', async () => {
            doctorDB.deleteDoctor =mockDoctorDbDeleteDoctor;
            const doctor = await doctorService.deleteDoctor({ id: 3 });
            expect(mockDoctorDbDeleteDoctor).toHaveBeenCalledTimes(1);
            expect(mockDoctorDbDeleteDoctor).toHaveBeenCalledWith({ id: 3 });
        });
    });






