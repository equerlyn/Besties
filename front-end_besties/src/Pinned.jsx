import {useDispatch, useSelector} from "react-redux"
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Link, useRouteError } from "react-router-dom";
import Navbar from "./Navbar";
import client from './Connection/Client';
import {setPinnedChats} from "./app/chatSlice"
import Pinnedbuble from "./Components/Pinnedbuble";

function Pinned() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const thisUser = useSelector((state) => state.user.thisUser);
  const thisFriend = useSelector((state) => state.user.thisFriend);
  const pinnedChats = useSelector((state) => state.chat.pinnedChats);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get('/pinned', {
          params: { username: thisUser.username, friend: thisFriend },
        });
        dispatch(setPinnedChats(response.data))
      } catch (error) {
        console.log('Error fetching chat data:', error.message);
      }
    };
    
    fetchData();
  }, [dispatch, thisUser, thisFriend]);
    
  return (
    <>
      <Navbar/>
      <div className="p-4">
        <div className='flex'>
          <GoArrowLeft size={30} className='mt-1 me-3'onClick={()=>navigate("/home/chat")}/>
          <div className='text-2xl'>Pinned Message from {thisFriend}</div>
        </div>
        <div className="p-4">
          {
            pinnedChats.map((chat) => {
              return <Pinnedbuble key={chat.id} data={chat}/>
            })
          }
        </div>
      </div>
    
    </>
  )
}

export default Pinned