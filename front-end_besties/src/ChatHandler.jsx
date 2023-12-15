// import { useDispatch, useSelector } from "react-redux";
// import client from './Connection/Client';
// import { setChats } from './app/chatSlice';

// const fetchDataChat = async () => {
//   const dispatch = useDispatch();

//   const thisUser = useSelector((state) => state.user.thisUser);
//   const thisFriend = useSelector((state) => state.user.thisFriend);

//   try {
//     const response = await client.get('/allchat', {
//       params: { username: thisUser.username, friend: thisFriend },
//     });

//     console.log(response.data);
//     dispatch(setChats(response.data));
//     console.log("hihihi");
//   } catch (error) {
//     console.log('Error fetching chat data:', error.message);
//   }
// };

// export default fetchDataChat;
