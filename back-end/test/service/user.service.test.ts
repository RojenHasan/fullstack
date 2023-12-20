import userService from '../../service/user.service';
import userDb from '../../domain/data-access/user.db';
import jwt from "jsonwebtoken";

// const jwtSecret = process.env.JWT_SECRET

const email = "testing@example.com"

// const genrateJwtToken = (email: string):string => {
//     const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: "BookHub"}
//     try {
//         return jwt.sign({email}, jwtSecret, options)
//     } catch (error) {
//         console.log(error)
//         throw new Error("Error genrating JWT token")
//     }
// }

// test('given: valid values for user, when: user is created, then: user is created with those values and that user is in the database', () => {
//     const user = userService.createUser({password:"123", email:"testing@example.com"});
//     expect(userDb.getUserByEmail({email:email})).toEqual(true);
// })

// test('given: valid values for a user, when: used to login, then: a JWT token is generated', () => {
//     const token = userService.authenticate({password:"123", email:email})
//     expect(token).toEqual(genrateJwtToken(email));
// })

// test('given: a valid value for an email, when: used to get a user, then: a user is returned', () => {
//     const user = userService.getUserByEmail({email:email})
//     expect(user).toEqual(userDb.getUserByEmail({email:email}));

// })
test('when getting all users, then: all users are returned', () => {
    expect(userService.getAllUsers()).toEqual(userDb.getAllUsers());
})

// test('given: a valid value for an id, when: used to get a user, then: a user is returned', () => {
//     const user = userService.getUserById({id:1})
//     expect(user).toEqual(userDb.getUserById({id:1}));
// })
