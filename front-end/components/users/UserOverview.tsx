/*
import React from "react";
import { User } from "@/types";
import { useRouter } from "next/router";
import UserService from "../../service/UserService";

type Props = {
    users: Array<User> | undefined
    onUserListChange: (updatedUsers : Array<User>) => void;
};


const UsersOverviewTable: React.FC<Props> = ({users, onUserListChange}: Props) => {
    const router = useRouter();

    const handleUpdate = (userId: number | undefined) =>{
        if (userId){
        sessionStorage.setItem('userId', userId.toString());}
        router.push(`/users/updateUser`)
    }

    const handleDelete =async (userId:number | undefined) => {
        try{
            if (userId){
            await UserService.deleteUser(userId);}
            const updatedUserList = users?.filter((user) => user.id !== userId) || [];
            onUserListChange(updatedUserList)
        } catch(error){

        }
    }
    if(users?.length===0){
        return <p style={{position: 'static',display: 'grid',textAlign: 'left',color: 'rgb(0,0,0)'}}> No users registered</p>}
    else{
        return(
            <>
                {users &&
                    users.map((user, key) =>(
                        <div key={user.id}>
                         <div>
                        <h1>{user.username}</h1>
                        <button type="button" onClick={() => handleDelete(user.id)}>Delete</button>
                        <button type="button" onClick={() => handleUpdate(user.id)} >Update</button>
                        <p>Role: {user.role}</p>
                    </div>
                    <div>
                        <p>
                           mail: {user.mail}
                           </p>
                    </div>
                </div>
                    ))}
            </>
        )
    }
}

export default UsersOverviewTable*/