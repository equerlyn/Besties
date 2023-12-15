import {useDispatch, useSelector} from "react-redux"
import Chattitle from './Components/Chattitle';
import Chattyping from './Components/Chattyping';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import client from './Connection/Client';
import Chatbuble from "./Components/Chatbuble";
import {setChats} from "./app/chatSlice"

function Chat() {
    // const [chats, setChats] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const thisUser = useSelector((state) => state.user.thisUser);
    const thisFriend = useSelector((state) => state.user.thisFriend);
    const chats = useSelector((state) => state.chat.chats);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await client.get('/allchat', {
            params: { username: thisUser.username, friend: thisFriend },
          });
          dispatch(setChats(response.data))
        } catch (error) {
          console.log('Error fetching chat data:', error.message);
        }
      };
      
      fetchData();
    }, [dispatch, thisUser, thisFriend]);

    return (
        <div className='flex flex-col w-full overflow-hidden h-screen'>
            <div className='sticky top-0 border-b-2 border-gray-500 mt-2'>
                <Chattitle/>
            </div>
            <div className='p-4 overflow-y-auto flex' style={{
                flexDirection: 'column-reverse',
                height: "478px"
              }}>
                {
                  chats.slice().reverse().map((chat)=> {
                    return <Chatbuble key={chat.id} chat={chat}/>
                  })
                }   
            </div>
            <div className='bottom-0 border-t-2 border-gray-500'>
                <Chattyping />
            </div>
        </div>
    )
}

export default Chat