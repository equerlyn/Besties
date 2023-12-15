import Navbar from './Navbar'
import {useDispatch, useSelector} from "react-redux"
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import client from "./Connection/Client.js";

function Add() {
    const navigate = useNavigate();
    const [searchFriend, setSearchFriend] = useState("")
    const [foundFriend, setFoundFriend] = useState(null);
    const [berhasil, setBerhasil] = useState(false);
    const [msg, setMsg] = useState("")
    const thisUser = useSelector((state) => state.user.thisUser);

    const handleSearchFriend = async () => {
        try{
            const response = await client.get("/searchFriend", {
                params: { searchUsername: searchFriend, username: thisUser.username},
            });
            console.log(response.data)
            if (response.data==="No user found!") {
                setFoundFriend(false)
                setBerhasil(false)
                setMsg("No user found!")
            } else {
                setFoundFriend(true)
                setMsg("")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleAddFriend = async () => {
        try{
            const data = { searchUsername: searchFriend, username: thisUser.username}
            const response = await client.post("/addFriend", data);

            if(response.data) {
                setBerhasil(true)
                setMsg("Add friend successful!")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Navbar/>
            <div className='p-4'>
                <div className='flex'>
                <GoArrowLeft size={30} className='mt-1 me-3'onClick={()=>navigate("/home/chat")}/>
                <div className='text-2xl'>Add Friend</div>
                </div>
                <div className="ms-10 mt-3">
                    <p className='text-md'>Username</p>
                    <input type="text" name="" id="" className='border border-black rounded-md px-2 py-1 w-96' value={searchFriend} onChange={(e) => setSearchFriend(e.target.value)}/>
                    <button onClick={handleSearchFriend} className="ms-4 border border-black px-5 py-1 bg-gray-300 hover:bg-gray-400 rounded-md">Search</button>
                </div>
                {
                    foundFriend ? (
                        <>
                            <p className="mt-10 ms-10">User found</p>
                            <div className="mt-3 border border-black rounded-md py-2 px-4 h-44 ms-10 w-2/6">
                                <p className='text-md'>{searchFriend}</p>
                                <p></p>
                                <button onClick={()=>handleAddFriend()} className='bg-gray-200 hover:bg-gray-300 rounded-md py-1 px-7 border border-black text-md float-right mt-24'>
                                    Add
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="mt-10 ms-10 text-red-600">{msg}</p>
                    )
                }
                {
                    berhasil && <p className="mt-10 ms-10 text-green-600">{msg}</p>
                }
            </div>

        </>
    )
}

export default Add