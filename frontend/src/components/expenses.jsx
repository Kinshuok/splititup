import {Appbar} from "./appbar.jsx";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {useRecoilState} from "recoil";
import {totalMoneyLentState, totalMoneyOwedState} from "../../recoil.js";

export function Expenses(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [expenses,setexpenses]=useState([]);
    const token = localStorage.getItem('token');
    const groupId= searchParams.get("groupId");
    const groupname=searchParams.get("groupname")
    const [totalmoney, setTotalMoney] = useRecoilState(totalMoneyLentState);
    const [moneyowed, setMoneyOwed] = useRecoilState(totalMoneyOwedState);

    useEffect( () => {
        axios.get(`http://localhost:3000/api/v1/expenses/groupexpenses?groupid=${groupId}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }).then(response=>{
            setexpenses(response.data.expenses);



        })
        axios.get("http://localhost:3000/api/v1/expenses/calculate-total-money", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                const { totalMoneyLent, totalMoneyOwed } = response.data;
                setTotalMoney(totalMoneyLent);
                setMoneyOwed(totalMoneyOwed);
            })
            .catch(error => {
                console.error('Error fetching total money:', error);
                // Handle errors here
            });

    }, [JSON.stringify(expenses)]);
    return <div>
        <Appbar/>

        <div className={"text-center"}>
            <div className="flex justify-center mb-6 mt-10">
                <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden mx-4">
                    <div className="p-8">
                        <h2 className="text-xl font-semibold text-gray-800">Total Money Owed</h2>
                        <div className="text-3xl font-bold text-blue-600 pt-2">₹{moneyowed}</div>
                    </div>
                </div>

                <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden mx-4">
                    <div className="p-8">
                        <h2 className="text-xl font-semibold text-gray-800">Total Money Lent</h2>
                        <div className="text-3xl font-bold text-green-600 pt-2">₹{totalmoney}</div>
                    </div>
                </div>
            </div>
            <h1 className="font-extrabold text-5xl pt-3 pb-4">{groupname}</h1>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 ">

                {expenses !== null && expenses.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 ">
                        {expenses.map(expense => (
                            <div key={expense._id} className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden mx-4 p-8 ">
                                <div className="text-xl font-semibold text-gray-800">{expense.description}</div>
                            </div>
                        ))}
                    </div>
                )}


              </div>


       </div>
    </div>

}