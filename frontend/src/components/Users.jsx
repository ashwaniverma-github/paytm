import { useState } from "react"
import {Button} from "./Button"

export function Users(){
    const  [users,setUsers] = useState([{
        firstName:"Harkirat",
        lastName:"singh",
        _id:1
    }])

    return <>
        <div className="font-bold mt-6 mx-4 text-lg" >
            Users
        </div>
        <div className="my-2 mx-4" >
            <input type="text" placeholder="Search users" className="w-full px-2 py-1 border rounded border-slate-500"/>
        </div>
        <div>
            {users.map(user=> <User user={user} />)}
        </div>

    </>
}

function User({user}){
    return <div className="flex justify-between " >
        <div className="flex" >
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 ml-4" >
                <div className="flex flex-col justify-center h-full text-xl" >
                    {user.firstName[0]}
                </div>
            </div>
            <div className=" flex flex-col justify-center h-full" >
                {user.firstName} {user.lastName}
            </div>
        </div>

        <div className=" flex flex-col justify-center mx-4" >
            <Button label={"Send money"} />
        </div>

    </div>
}