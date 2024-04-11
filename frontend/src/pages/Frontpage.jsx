import React, {useState} from 'react';
import logo from '../assets/img.png';
import frnt from '../assets/img_1.png'
import { useNavigate } from 'react-router-dom';
import {InputBox} from "../components/inputbox.jsx";
import {Signup} from "./Signup.jsx";
import {Signin} from "./Signin.jsx";
export function Frontpage() {
    const [show,setshow]=useState(false);
    const [show2,setshow2]=useState(false);
    const navigate=useNavigate();
    return <>

        <div className="flex justify-between py-3 px-3 items-center shadow-lg m">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-14 w-14 mr-2"/>
                <div className="text-lg font-bold">Splititup</div>
            </div>
            <div>
                <button onClick={()=>{
                    setshow2(true);
                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Sign In
                </button>
                {show2 && <Signin onClose={()=>{
                    setshow2(false);
                }}/>}
                <button onClick={()=>{
                    setshow(true);
                }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Sign Up
                </button>
            </div>
        </div>
        <div className={"flex h-screen"}>
            <img src={frnt} className={"w-1/2 h-full object-cover"}/>
            <div className={"w-1/2 flex flex-col justify-center items-start overflow-y-auto"}>
                <p className={"text-center flex-grow"}>
                    Welcome to Splititup – the ultimate solution for hassle-free expense management! Say goodbye to
                    awkward money discussions and hello to seamless collaboration. With Splititup, effortlessly split
                    bills, share household expenses, and organize group outings with ease. Our intuitive platform
                    automates calculations, ensuring fairness for all. Enjoy peace of mind with secure payment options
                    and a user-friendly interface. Join Splititup today and simplify your shared expenses journey!
                </p>
            </div>

        </div>
        {show && <Signup onClose={()=>{
            setshow(false);
        }}/>}



    </>

}
