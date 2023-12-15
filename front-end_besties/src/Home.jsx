import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import client from "./Connection/Client.js";
import Navbar from './Navbar.jsx';
import Chatlist from './ChatList.jsx';
import { Outlet } from "react-router-dom";
import {setThisUser, setLoggedIn} from "./app/userSlice.js"

function Home() {
  return (
    <>
      <Navbar/>
      <Chatlist/>
    </>
  )
}

export default Home