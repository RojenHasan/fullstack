import { User } from "../types"

const login =  async (user:User)=>{
    return await fetch(process.env.NEXT_PUBLIC_API_URL 
      + "/users/login",
    {
    body: JSON.stringify(user),
    method: "POST",
    headers: {
        "Content-type": "application/json"
      }
    })

}

const signup =  async (user:User)=>{
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup",
    {
    body: JSON.stringify(user),
    method: "POST",
    headers: {
        "Content-type": "application/json"
      }
    })

}

const getAllUsers = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL+ "/users/",{
      method: "GET",
      headers: {
          "Content-type": "application/json",
          Authorization:  `Bearer ${sessionStorage.getItem("token")}`
      }

  })
}

const UserService = {
    login,
    signup, getAllUsers
}

export default UserService
