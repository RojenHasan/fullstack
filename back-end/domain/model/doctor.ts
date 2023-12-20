import {
    User as UserPrisma, Doctor as DoctorPrisma
} from '@prisma/client';
import { User } from './user';

export class Doctor {
    readonly id : number;
    readonly name: string;
    readonly experience: string;
    readonly availability: string;
    readonly user: User;

    constructor (doctor: {id: number,user:User, name: string, experience: string, availability: string}){
        this.id = doctor.id;
        this.name = doctor.name;
        this.availability = doctor.availability;
        this.experience = doctor.experience;
        this.user= doctor.user;
    }
    static validate(doctor: { name?: string; experience?: string; availability?: string}) {
        if (!doctor.name) {
            throw new Error('Doctor name is required');
        }
        if (!doctor.experience) {
            throw new Error('Doctor experience is required');
        }
        if (!doctor.availability) {
            throw new Error('Doctor availability is required');
        }
    }


    static create(id : number,user: User, name: string, experience: string, availability: string ){
        return new Doctor({id:id,user: user, name:name, experience: experience, availability:availability})
    }

    /*linkUser(user: User) {
        this.user = user;
    }*/
    static from({
        id,
        name,
        experience,
        availability,
        user 
    }: DoctorPrisma & { user: UserPrisma }) {
        return new Doctor({
            id,
            name,
            experience,
            availability,
            user: User.from(user)
        });
    }
    
}