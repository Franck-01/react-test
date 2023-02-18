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
    const onChange_Handler = (e) => {
        const {name, value} = e.target
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
                navigate("/");
            }
        })
        .catch((err) => {
            console.log(`Request error: ${err}`)
        })
    }
    return(
        <div>
            <from onSubmit={submit_Handler}>
                <h2>Login</h2>
                <div>
                    <label htmlForm="username">Username</label>
                    <input 
                        type="text"
                        placeholder="Username"
                        id="username"
                        name="username" 
                        value={inputs.username} 
                        onChange={onChange_Handler}/>
                </div>
                <div>
                    <label htmlForm="password">Password</label>
                    <input 
                        type="text"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={inputs.password}
                        onChange={onChange_Handler}/>
                </div>
                <div>
                    <button>Login</button>
                    <a href="#">Forgot Password?</a>
                </div>
            </from>
            <ToastContainer/>
        </div>
    )
}
export default Login_body;