import { useRef } from 'react';
import client from '../Connection/Client';
import { useDispatch, useSelector } from "react-redux"
import {setChats, setLatestChat} from "../app/chatSlice"

function Chattyping() {
  const dispatch = useDispatch();
  const textareaRef = useRef();
  const thisUser = useSelector((state) => state.user.thisUser);
  const thisFriend = useSelector((state) => state.user.thisFriend);

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

  const fetchLastMessage = async () => {
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

  const onSubmit = async () => {
    const pesan = textareaRef.current.value;
    if(pesan == "") alert("pesan tidak boleh kosong!")
    else {
      textareaRef.current.value = '';
      try {
        const response = await client.post('/sendMsg', { pesan: pesan, from: thisUser.username, to: thisFriend });
        if(response) {
          fetchData();
          fetchLastMessage();
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className='flex justify-between px-5 py-4 w-max'>
      <textarea
        ref={textareaRef}
        style={{ resize: 'none' }}
        name=''
        id=''
        cols='134'
        rows='3'
        className='border-black border rounded-md p-2'
      ></textarea>
      <div className='mt-5 ms-5'>
        <button onClick={onSubmit} className='bg-gray-300 px-5 py-2 hover:bg-gray-400 border-2 rounded-md'>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chattyping;
