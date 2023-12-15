import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import {useDispatch, useSelector} from "react-redux"
import client from "./Connection/Client.js";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: joiResolver(Joi.object({
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
      })),
    });

    const [msg, setMsg] = useState('');

    const onSubmit = async (data) => {
        try {
            const response = await client.post('/', data);
            if (response.data.success) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userData', JSON.stringify(response.data.user));
                
                navigate("/home")
            } 
        } catch (error) {
            setMsg('Login gagal. Username atau password salah.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}> 
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md border border-black shadow-md lg:max-w-md">
                    <h1 className="text-3xl font-semibold text-center mb-10">LOGIN</h1>
                    <div className="mb-2">
                        <label className="block text-md font-semibold text-black">Username </label>
                        <input type="text" {...register("username")} className="w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-amber-100 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/> <br/>
                        {errors.username && <span style={{color:"red"}}>{errors.username.message} <br /></span>}
                    </div>
                    <div className="mb-2">
                        <label className="block text-md font-semibold text-gray-800">Password</label>
                        <input type="text" {...register("password")} className="w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-amber-100 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/> <br/>
                        {errors.password && <span style={{color:"red"}}>{errors.password.message} <br /></span>}

                    </div>
                    <div className="mt-6 flex">
                    <button type="submit" className="me-2 w-full h-full px-4 py-2 duration-200 transform bg-green-400 rounded-md hover:bg-green-600 focus:outline-none">
                        Login
                    </button>
                    <Link className='px-4 py-2 w-full h-full duration-200 transform bg-gray-400 rounded-md hover:bg-gray-600 focus:outline-none text-center' to={"/register"}>
                        <button className="">
                            To Register
                        </button>
                    </Link>
</div>
                    {
                        <span style={{color:"red"}}><br />{msg}</span>
                    }
                </div>
            </div>
        </form>
    )
}

export default Login