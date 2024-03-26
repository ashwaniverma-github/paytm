import {Heading} from "../components/Heading";
import {SubHeading} from "../components/SubHeading"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export function Signup(){
    return <div className="bg-slate-500 h-screen flex justify-center" >
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4" >
                <Heading label="Sign up"/>
                <SubHeading label="Enter your information to create an acoount" />
                <InputBox label="First Name" placeholder="John" />
                <InputBox label="last Name" placeholder="doe" />
                <InputBox label="Username" placeholder="john@gmail.com" />
                <InputBox label="Password" placeholder="Enter password" />
                <div className="pt-4" >
                    <Button label="Sign up" />
                </div>
                <BottomWarning label={"Already have an acoount"} buttonText={"Sign in"} to={"/signin"}/>
                
            </div>
        </div>      
    </div>
}