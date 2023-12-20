
import userDb from "../domain/data-access/user.db";
import {User} from "../domain/model/user";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserInput } from "../types/types";


const jwtSecret = process.env.JWT_SECRET
const genrateJwtToken = (email: string):string => {
    const options = {
        expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, 
        issuer: "HuisartsPraktijk"
    }
    try {
        return jwt.sign({email}, jwtSecret, options)
    } catch (error) {
        console.log(error)
        throw new Error("Error genrating JWT token")
    }
}
const createUser = async (user: UserInput): Promise<User> => {
    User.validate(user)
    const existingUser = await userDb.getUserByEmail(user.email)
    if(existingUser){
        throw new Error(`User with email ${user.email} is already exist`)
    }
    const hashedPassword = await bcrypt.hash(user.password, 12)
    user.password = hashedPassword;
    return await userDb.createUser(user)
}

const authenticate = async ({password, email}:UserInput) :Promise<string>=> {
    const user = await getUserByEmail({ email: email })
    if(!user){
        throw new Error("User couldn't be found")
    }
    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword){
        throw new Error("Incorrect password")
    }

    return genrateJwtToken(email)
    /*return {
        token: genrateJwtToken(email),
        email: email,
        role: user.role
    }
     */
}
const getUserByEmail = async ({email}:{email:string}): Promise<User> => {
    if (!email) {
        throw new Error('Email is empty.');
      }
    const user = await  userDb.getUserByEmail(email)
    if(!user) throw  new Error(`No User with email ${email}`);
    return user;
}

const getAllUsers = async (): Promise<User[]> => 
await userDb.getAllUsers();

const getUserById =async (id: number): Promise<User> => {
    const user = await userDb.getUserById(id);
    return user;
}

const deleteUserById = async (id: number): Promise<User> => {
    //Check if user exist with help of get getUserById below
    await getUserById(id);
    return await userDb.deleteUserById(id);
};

const updateUser = async (user: UserInput): Promise<User> => {
    User.validate(user);
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    return await userDb.updateUser(user);
};
export default {updateUser, deleteUserById, getAllUsers, getUserById,createUser, authenticate, getUserByEmail}