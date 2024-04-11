import {InputBox} from "../components/inputbox.jsx";
import React, {useState} from "react";
import { X } from 'lucide-react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
export function Signup({onClose}){
    const navigate =useNavigate();
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [firstname,setfirstname]=useState("");
    const [lastname,setlastname]=useState("");
    return <div className={" fixed inset-0 bg-opacity-30 bg-black backdrop-blur-sm"}>
        <div className={"flex justify-center items-center h-screen" }>
            <div className={"bg-black p-5 rounded-lg flex flex-col gap-3 w-80 text-white"}>
                <button onClick={onClose}><X/></button>
                <div className={"text-violet-400 text-3xl font-bold text-center"}>SIGN UP</div>
                <InputBox label={"Email"} placeholder={"123@gmail.com"} onChange={(e) => {
                    setemail(e.target.value);
                }}></InputBox>
                <InputBox label={"Password"} placeholder={"********"} onChange={(e) => {
                    setpassword(e.target.value);
                }}></InputBox>
                <InputBox label={"FirstName"} placeholder={"Kinshuok"} onChange={(e) => {
                    setfirstname(e.target.value);
                }}></InputBox>
                <InputBox label={"LastName"} placeholder={"Munjal"} onChange={(e) => {
                    setlastname(e.target.value);
                }}></InputBox>
                <button onClick={ async ()=>{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                        username:email,
                        password: password,
                        firstName:firstname,
                        lastName:lastname,
                    })
                    localStorage.setItem("token",response.data.token);
                    navigate("/dashboard");
                }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-4">
                    Sign Up
                </button>
            </div>

        </div>
    </div>
}