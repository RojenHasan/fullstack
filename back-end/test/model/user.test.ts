import { User } from "../../domain/model/user";

const email= 'rojin@gmail.com'
const pass = "123"


test('given: valid values for user, when: user is created, then: user is createde with those values', () => {
    const user = new User({id:1,email:email,password:pass});
    expect(user.password).toEqual(pass);
    expect(user.email).toEqual(email);
})