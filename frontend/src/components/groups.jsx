import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { groupState, totalMoneyLentState, totalMoneyOwedState } from "../../recoil.js";
import { Creategroup } from "./Creategroup.jsx";
import { Signup } from "../pages/Signup.jsx";

export function Groups() {
    const navigate = useNavigate();
    const [groups, setGroups] = useRecoilState(groupState);
    const [totalmoney, setTotalMoney] = useRecoilState(totalMoneyLentState);
    const [moneyowed, setMoneyOwed] = useRecoilState(totalMoneyOwedState);
    const [create, setCreate] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get("http://localhost:3000/api/v1/group/mygroups", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setGroups(response.data);
            })
            .catch(error => {
                console.error('Error fetching groups:', error);
            });

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
            });
    }, [JSON.stringify(groups)]);

    return (
        <div className="text-center">
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

            <h1 className="font-extrabold text-5xl pt-3 pb-4">MY GROUPS</h1>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                {groups.map(group => (
                    <div key={group._id}>
                        <button onClick={() => navigate(`/expense?groupId=${group._id}&&groupname=${group.name}`)} className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden mx-4 p-8">
                            <h2 className="text-xl font-semibold text-gray-800">{group.name}</h2>
                        </button>
                    </div>
                ))}

                <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden mx-4 p-8">
                    <button onClick={() => setCreate(true)} className="text-xl font-semibold text-gray-800">Create Group+</button>
                </div>
            </div>

            {create && <Creategroup onClose={() => { setCreate(false); }} />}
        </div>
    );
}
