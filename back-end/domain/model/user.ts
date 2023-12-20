import { User as UserPrisma } from '@prisma/client';
import { UserInput } from '../../types/types';

export class User {
    readonly id: number;
    readonly email: string;
    readonly password: string;
    readonly role: string;

    constructor(user: {
        id?: number;
        email: string;
        password: string;
        role: string;
    }) {
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }
     static validate(user: {
        email?: string;
        password?: string;
        role?: string 
        }) {
        if(!user.email?.trim()){
            throw new Error('Email is required');
        }
        if(!user.password?.trim()){
            throw new Error('Password is required');
        }
        if (!new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$').test(user.email)) {
            throw new Error('Incorrect email.');
        }
        if (!new RegExp('.{8,}').test(user.password)) {
            throw new Error('Wachtwoord moet minstens 8 tekens lang zijn.');
        }
        const roles = ['admin', 'user', 'technicians'];
        if (!roles.includes(user.role)) {
            throw new Error('Incorrecte rol.');
        }
    }

    /*equals({ id, username, email, password }): boolean {
        return (
            this.id === id &&
            this.username === username &&
            this.email === email &&
            this.password === password
        );
    }*/
    static create
    (id:number, email:string, password:string, role: string){
        return new User( {
            id,
            email,
            password, role
        })
    }

    static from({ id, email, password, role }: UserPrisma) {
        //console.log("UserPrisma:", { id, email, password, role });
        
        return new User({
            id,
            email,
            password,
            role 
        });
    }
    
}