import React from 'react'
import Error from "./Error";
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from './Login';
import store from './app/store'
import {Provider, useSelector} from 'react-redux'
import Register from './Register';
import Home from './Home';
import Chat from './Chat';
import DummyErrorPage from './DummyErrorPage';
import Pinned from './Pinned';
import Add from './Add';

const PrivateRouteLogin = () => {
  const loggedIn = localStorage.getItem('isLoggedIn');
  console.log(loggedIn)
  if (loggedIn === 'false' || loggedIn == null) {
    return <Navigate to="/" />
  } else if (loggedIn === 'true') {
    return <Home />
  }
};

const PrivateRouteRegister = () => {
  const loggedIn = localStorage.getItem('isLoggedIn');
  console.log(loggedIn)
  if (loggedIn === 'false' || loggedIn == null) {
    return <Register />
  } else if (loggedIn === 'true') {
    return <Navigate to="/home" />
  }
};

const PrivateRouteChat = () => {
  const loggedIn = localStorage.getItem('isLoggedIn');
  if (loggedIn === 'false' || loggedIn == null) {
    return <Navigate to="/dummy" />
  } else if (loggedIn === 'true') {
    console.log("ININIINININI")
    return <Chat />
  }
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: <PrivateRouteRegister />,
    errorElement: <Error />,
  },
  {
    path: '/home',
    element: <PrivateRouteLogin />,
    errorElement: <Error />,
    children : [
      {
        index: true,
        element: <div className='min-h-screen flex flex-col text-5xl text-center justify-center'>Make new conversation!</div>,
        errorElement: <Error />,
      },
      {
        path: 'chat',
        element: <Chat />,
        errorElement: <Error/>
      },
    ]
  },
  {
    path: 'home/chat',
    element: <PrivateRouteChat/>,
    errorElement: <Error/>
  },
  {
    path: "home/chat/pinned",
    element: <Pinned/>,
    errorElement: <Error/>,
  },
  {
    path: "/add",
    element: <Add/>,
    errorElement: <Error/>
  },
  {
    path: "/dummy",
    element: <DummyErrorPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);
