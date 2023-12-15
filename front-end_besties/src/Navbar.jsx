import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import client from "./Connection/Client.js";
import {setThisUser, setLoggedIn} from "./app/userSlice"

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Mendengarkan perubahan di localStorage untuk status login
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        // Jika status login berubah, dispatch aksi setLoggedIn
        if (isLoggedIn) {
        dispatch(setLoggedIn(true));
        // Mendapatkan data pengguna dari localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));

        // Jika ada data pengguna, dispatch aksi setThisUser
        if (userData) {
            dispatch(setThisUser(userData));
        }
        }
    }, [dispatch]);

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const thisUser = useSelector((state) => state.user.thisUser);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');

        dispatch(setThisUser({}));
        dispatch(setLoggedIn(false));

        navigate("/")
    }

    return (
        <div className="border-b-2 border-gray-500 mt-2 sticky top-0">
            <div className="flex justify-between mx-3">
                <div className='text-2xl mb-3'>Welcome, {thisUser.username}!</div>
                <div className='font-bold  text-3xl'>Besties</div>
                <div>
                    <Link className='' to={"/home/chat"}>
                        <button className='px-5 py-1 me-5 bg-gray-300 hover:bg-gray-400 border-2 rounded-md'>Reload</button>
                    </Link>
                    <button onClick={handleLogout} className='px-5 py-1 bg-gray-300 hover:bg-gray-400 border-2 rounded-md'>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar