import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register_body = () => {
    const navigate = useNavigate();

    const [inputs, set_Inputs] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    })
    const onChange_Handler = (e) => {
        const {name, value} = e.target
        set_Inputs((prev) => {
            return{
                ...prev,
                [name]: value
            }
        })
    }
    const submit_Handler = (e) => {
        e.preventDefault();
        console.log(inputs);

        axios.post(
            "http://localhost:7000/register",
            {...inputs},
            {withCredentials: true}
        )
        .then((res) => {
            console.log(res);
            
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
        .catch((err) =>{
            console.log(`Request error: ${err}`)
        })
    }
    return (
        <div>
            <form onSubmit={submit_Handler}>
                <h2>Register</h2>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text"
                        placeholder="Name"
                        id="name"
                        name="name" 
                        onChange={onChange_Handler} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        placeholder="Email"
                        id="email"
                        name="email" 
                        onChange={onChange_Handler} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"  
                        onChange={onChange_Handler} />
                </div>
                <div>
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input 
                        type="password"
                        placeholder="Confirm Password"
                        id="confirm_password"
                        name="confirm_password"  
                        onChange={onChange_Handler} />
                </div>
                <div>
                    <button>Register</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}
export default Register_body;