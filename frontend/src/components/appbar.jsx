import logo from "../assets/img.png";
import React from "react";

export function Appbar({user}){
    return <>

        <div className="flex justify-between py-3 px-3 items-center shadow-lg m">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-14 w-14 mr-2"/>
                <div className="text-lg font-bold">Splititup</div>
            </div>
        </div>


    </>
}