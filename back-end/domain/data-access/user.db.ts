//import { User } from "@prisma/client";
import { database } from "../../util/db.server"
import { User } from "../model/user";
import { UserInput } from "../../types/types";
import { Prisma } from "@prisma/client";


const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const getUserById = async (id : number): Promise<User> => {
    const user = await database.user.findUnique({
        where: { id: id },
      });
    
      if (!user) {
        throw new Error(`Gebruiker met id ${id} is niet gevonden`);
      }
      return user;
};


const deleteUserById = async (id: number): Promise<User> => {
    const deletedUser = await database.user.delete({
        where: {
            id: id,
        },
    });
    return deletedUser;
};
const updateUser = async ({
    id,
    email,
    password,
    role,
}: UserInput): Promise<User> => {
    try {
        return await database.user.update({
            where: {
                id: id || undefined,
            },
            data: {
                email,
                role,
                password,
            },
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(`Gebruiker met email {${email}} bestaal al`);
            }
        }
        throw new Error(error.message);
    }
};

const createUser = async ({password, email, role}:
    UserInput): Promise<User> => {
   try {  
    const userPrisma = await database.user.create({
        data:{
            password, 
            email,
            role
        },
    });
    return User.from(userPrisma);
   }catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            throw new Error(`Gebruiker met email {${email}} bestaal al`);
        }
    }
    throw new Error(error.message);
   }
}

const getUserByEmail =async ( email : string ): 
Promise<User>=> {
    const user = await database.user.findUnique({
        where: { email: email },
      });
    return user; 
}



export default {deleteUserById, updateUser ,getAllUsers, getUserById, createUser, getUserByEmail}
