import {InputBox} from "../components/inputbox.jsx";
import React, {useState} from "react";
import { X } from 'lucide-react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
export function Signin({onClose}){
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const navigate = useNavigate()

    return <div className={" fixed inset-0 bg-opacity-30 bg-black backdrop-blur-sm"}>
        <div className={"flex justify-center items-center h-screen" }>
            <div className={"bg-black p-5 rounded-lg flex flex-col gap-3 w-80 text-white"}>
                <button onClick={onClose}><X/></button>
                <div className={"text-violet-400 text-3xl font-bold text-center"}>SIGN IN</div>
                <InputBox label={"Email"} placeholder={"123@gmail.com"} onChange={(e) => {
                    setemail(e.target.value);
                }}></InputBox>
                <InputBox label={"Password"} placeholder={"********"} onChange={(e) => {
                    setpassword(e.target.value)
                }}></InputBox>

                <button onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                        username:email,
                       password: password
                    })
                    localStorage.setItem("token",response.data.token);
                    navigate("/dashboard");

                    }
                }

                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-4">
                    Sign In
                </button>
            </div>

        </div>
    </div>
}