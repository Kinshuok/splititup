import { InputBox } from "./inputbox.jsx";
import React, { useEffect, useState } from "react";
import { X } from 'lucide-react';
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import Select from "react-select";
import {useRecoilState} from "recoil";
import {groupState} from "../../recoil.js";

export function CreateExpense({ onClose }) {
    const token = localStorage.getItem('token');
    const [searchParams, setSearchParams] = useSearchParams();
    const groupId= searchParams.get("groupId");
    connst [amount,setamount]=useState(0);
    // const [groups,setGroups]=useRecoilState(groupState);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [participants, setParticipants] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setUsers(response.data.user);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, [token]);

    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        const selectedUsers = selectedOptions.map(option => option.value);
        setParticipants(selectedUsers);
    }

    const createGroup = () => {
        axios.post("http://localhost:3000/api/v1/expenses/create-with-participants", {
            description: name,
            amount: amount,
            groupid:groupId,
            participants: participants
        },{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
    }

    return (
        <div className="fixed inset-0 bg-opacity-30 bg-black backdrop-blur-sm">
            <div className="flex justify-center items-center h-screen">
                <div className="bg-black p-5 rounded-lg flex flex-col gap-3 w-80 text-white">
                    <button onClick={onClose}><X /></button>
                    <div className="text-violet-400 text-3xl font-bold text-center">Create group</div>
                    <InputBox label="Name" placeholder="Group Name" onChange={(e) => setName(e.target.value)} />
                    <Select className={"text-black"}
                            options={users.map(user => ({ value: user._id, label: `${user.firstName} ${user.lastName}` }))}
                            value={selectedOptions}
                            onChange={handleChange}
                            isMulti

                    />
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-4" onClick={createGroup}>
                        Create group
                    </button>
                </div>
            </div>
        </div>
    );
}
