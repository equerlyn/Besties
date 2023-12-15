import { setThisFriend } from '../app/userSlice';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLatestChat } from '../app/chatSlice';
import client from '../Connection/Client';

const FriendList = ({ latestChat, setLatestChat }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const thisUser = useSelector((state) => state.user.thisUser);
  const handleClick = async (temanChat) => {
    console.log("Ini ", temanChat);
    dispatch(setThisFriend(temanChat))
    
    // Update read status locally
    const updatedChats = latestChat.map((chat) => {
      if (chat.friend === temanChat && chat.latestChat && chat.latestChat.read === 0) {
        return {
          ...chat,
          latestChat: {
            ...chat.latestChat,
            read: 1,
          },
        };
      }
      return chat;
    });

    client.put(`/read`, {friend: temanChat, username: thisUser.username})

    dispatch(setLatestChat(updatedChats)); // Update the state with the modified array
    navigate('/home/chat');
  };

  console.log(latestChat)

  return (
    <div>
      {latestChat.map((chat) => (
        <button
          key={chat.friend} // Move the key attribute to the button element
          className='w-full'
          onClick={() => handleClick(chat.friend)}
        >
          <div className={`border border-black w-full h-20 py-2 px-4 hover:border-2 rounded-md mb-3 ${chat.latestChat && chat.latestChat.read === 0 && chat.latestChat.from === chat.friend? 'font-bold' : ''}`}>
            <div className="flex justify-between items-center">
              <p className='text-lg mb-2'>{chat.friend}</p>
              {chat.latestChat && chat.latestChat.read === 0 && chat.latestChat.from == chat.friend && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
            </div>
            <p className={chat.latestChat && chat.latestChat.read === 0 && chat.latestChat.from == chat.friend ? 'text-sm font-bold text-left' : 'text-left text-sm text-gray-500'}>
              {chat.latestChat ? chat.latestChat.msg : ''}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default FriendList;
