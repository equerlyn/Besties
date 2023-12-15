import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setThisUser, setLoggedIn } from './app/userSlice';
import client from './Connection/Client';
import { Outlet } from "react-router-dom";
import FriendList from './Components/Friendlist';
import { setLatestChat } from './app/chatSlice';
import { Link, useRouteError } from "react-router-dom";

function Chatlist() {
  const dispatch = useDispatch();
  const thisUser = useSelector((state) => state.user.thisUser);
  const latestChat = useSelector((state) => state.chat.latestChat);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    if (isLoggedIn) {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (userData) {
        dispatch(setThisUser(userData));
        dispatch(setLoggedIn(true));
      }
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get('/chat', {
          params: { username: thisUser.username },
        });

        const sortedLatestChat = response.data.sort((a, b) => {
          if (a.latestChat === null) return 1;
          else if (b.latestChat === null) return -1;
          else return b.latestChat.id - a.latestChat.id;
        });

        dispatch(setLatestChat(sortedLatestChat));
      } catch (error) {
        console.log('Error fetching chat data:', error.message);
      }
    };

    fetchData();
  }, [dispatch, thisUser]);

  return (
    <div className="grid grid-cols-4 h-screen fixed">
      <div className="overflow-y-auto p-6">
        <div className="flex justify-between">
          <div className="text-3xl">Home</div>
          <Link className='' to={"/add"}>
            <button className="bg-yellow-200 hover:bg-yellow-300 rounded-md px-4 py-2">
              Add Friend
            </button>
          </Link>
        </div>
        <div className="items-center mt-3">
          {thisUser.friends && (
            <FriendList latestChat={latestChat} setLatestChat={setLatestChat}/>
          )}
        </div>
      </div>
      <div className="col-span-3 bg-white border-l border-black">
        <Outlet />
      </div>
    </div>
  );
}

export default Chatlist;
