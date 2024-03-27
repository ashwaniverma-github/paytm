import {Heading} from "../components/Heading";
import {SubHeading} from "../components/SubHeading"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export function Signin(){
    return <div className="bg-slate-500 h-screen flex justify-center" >
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4" >
                <Heading label="Sign in"/>
                <SubHeading label="Enter your E-mail and password" />
                <InputBox label="Email" placeholder="john@gmail.com" />
                <InputBox label="Password" placeholder="Enter password" />
                <div className="pt-4" >
                    <Button label="Sign in" />
                </div>
                <BottomWarning label={"Don't have an account- "} buttonText={"Sign up"} to={"/signup"}/>
                
            </div>
        </div>      
    </div>
}