import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login_body = () => {
    const [inputs, set_Inputs] = useState({
        username: "",
        password: "",
    })
    const navigate = useNavigate()
    const onChange_Handler = (prev) => {
        const {name, value} = prev.target
        set_Inputs({
            ...prev,
            [name]: value
        })
    }
    const submit_Handler = (e) => {
        e.preventDefault()
        console.log(inputs)
        axios.post(
            "http://localhost:7000/login",
            {...inputs},
            {withCredentials: true}
        )
        .then((res) => {
            console.log(res)

            if (!res.data.created) {
                if (res.data.error_type === 0) {
                    toast.error(res.data.error[0].msg, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (res.data.error_type === 1) {
                    toast.error(res.data.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
            if (res.data.created) {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/register");
            }
        })
        .catch((err) => {
            console.log(`Request error: ${err}`)
        })
    }
    return(
        <div className="w-full flex justify-center items-center">
            <form
                className="bg-white p-4 shadow-md border rounded my-5 py-3"
                onSubmit={submit_Handler}
            >
                <h2 className="text-center w-full p-3 text-gray-500 text-xl font-bold">
                    Login
                </h2>
                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" htmlForm="username">
                        Username
                    </label>
                    <input 
                        type="text"
                        placeholder="Username"
                        id="username"
                        name="username" 
                        value={inputs.username} 
                        onChange={onChange_Handler}
                        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md  border border-gray-500 rounded"
                        />
                </div>
                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" htmlForm="password">
                        Password
                    </label>
                    <input 
                        type="text"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={inputs.password}
                        onChange={onChange_Handler}
                        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md  border border-gray-500 rounded"
                        />
                </div>
                <div className="flex justify-between items-center my-3 mb-5">
                    <button className="text-white font-bold bg-blue-500 py-2 px-3 border rounder hover:bg-blue-700">
                        Login
                    </button>
                    <a href="/" className=" text-blue-500">Forgot Password?</a>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}
export default Login_body;