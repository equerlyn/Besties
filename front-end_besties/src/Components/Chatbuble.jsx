import { useDispatch, useSelector } from "react-redux";
import client from '../Connection/Client';
import {setChats, setLatestChat} from "../app/chatSlice"

function Chatbuble({ chat }) {
  const dispatch = useDispatch();
  function isURL(str) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(str);
  }
  const isURLValid = isURL(chat.msg);

  const thisUser = useSelector((state) => state.user.thisUser);
  const thisFriend = useSelector((state) => state.user.thisFriend);
  
  const isCurrentUser = chat.from == thisUser.username;
  
  const bubbleStyleCurrentUser = "bg-green-200 p-2 mb-2 w-fit-content rounded-tl-lg rounded-br-lg rounded-bl-lg text-center";
  const bubbleStyleOtherUser = "bg-red-200 py-2 px-3 mb-2 w-fit-content rounded-tr-lg rounded-br-lg rounded-bl-lg";
  const pinnedBubbleStyleOtherUser = "bg-yellow-200 p-2 mb-2 w-fit-content rounded-tr-lg rounded-br-lg rounded-bl-lg text-center";
  const pinnedBubbleStyleCurrentUser = "bg-yellow-200 p-2 mb-2 w-fit-content rounded-tl-lg rounded-br-lg rounded-bl-lg text-center";

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

  const handleUnsend = async (chatId) => { 
    try {
      // Make a request to your backend to update the status to 0
      await client.put(`/unsend`, { id: chatId });
      fetchData();
      fetchLastMessage();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePinMessage = async (chatId) => {
    try {
      await client.put(`/pin`, { id: chatId });
      fetchData();
      fetchLastMessage();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div onDoubleClick={()=>handlePinMessage(chat.id)}> 
      {chat.status === 1 && (
        <div>
          {isCurrentUser ? (
            <div className="flex justify-end">
              <div className={chat.pinned ? pinnedBubbleStyleCurrentUser : bubbleStyleCurrentUser}>
                {
                  isURLValid ? (
                    <img src={chat.msg} alt="User uploaded" className="w-52 h-44" />
                  ) : (
                    <p className="my-2 mx-3 text-right">{chat.msg}</p>
                  )
                }
                <hr className="my-2 border-gray-400" />
                <button className="px-5" onClick={() => handleUnsend(chat.id)}><p className="text-sm text-gray-500 mb-2">unsend</p></button>
              </div>
            </div>
          ) : (
            <div className="flex justify-start">
              <div className={chat.pinned ? pinnedBubbleStyleOtherUser : bubbleStyleOtherUser}>
                {isURLValid ? (
                  <img src={chat.msg} alt="User uploaded" className="w-52 h-44" />
                ) : (
                  <p>{chat.msg}</p>
                )
                }
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Chatbuble;