import "../styles/NavBar.css"
import React, {useContext, useState} from "react"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { Link } from "react-router-dom"
import Cookie from "js-cookie"
import { GlobalContext } from "./context/GlobalContext.js"

const NavBar = () => {
    const [nav, set_Nav] = useState(false)
    const {LoginStatus, LoggerIn, cart} = useContext(GlobalContext)

    const toggle_Nav = () => {
        set_Nav(!nav)
    }
    const logout_Handler = () => {
        Cookie.remove('jwt_token')
        LoggerIn(false)
    }
    return(
        <div className="w-full h-25 bg-[#000300] flex justify-between items-center">
            <h1 className="text-white font-bold md:text-4xl sm:3xl text-xl p-3">
                E-COMMERCE
            </h1>
            <ul className="hidden md:flex p-3">
                <Link to="/">
                    <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                        Home
                    </li>
                </Link>
                <Link to="cart">
                    <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                        Cart <span className="px-1 py-0.4 bg-orange-400 rounded-full ">{cart.length}</span>
                    </li>
                </Link>
                {LoginStatus ? (
                    <>
                        <Link to="addnewproduct">
                            <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                Add New Product
                            </li>
                        </Link>
                        <Link to="/">
                            <li
                                onClick={logout_Handler}
                                className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer"
                            >
                                Logout
                            </li>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                Login
                            </li>
                        </Link>
                        <Link to="register">
                            <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                Register
                            </li>
                        </Link>
                    </>
                )}
            </ul>
            <div className="md:hidden">
                {nav ? (
                    <AiOutlineClose onClick={toggle_Nav} className="text-white text-4xl px-2"/>
                ) : (
                    <AiOutlineMenu onClick={toggle_Nav} className="text-white text-4xl px-2 "/>
                )}
            </div>
            <div className={nav
            ? `md:hidden fixed top-0 left-0 h-[100%] w-60 bg-[#000300] ease-in-out duration-300`
            : `hidden `}>
                <h1 className="text-white text-left font-bold md:text-4xl sm:3xl text-xl p-3">
                    E-COMMERCE
                </h1>
                <ul className=" flex flex-col text-left p-3">
                    <Link to="/">
                        {" "}
                        <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                            Home
                        </li>
                    </Link>
                    <Link to="cart">
                        <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                            Cart
                        </li>
                    </Link>
                    {LoginStatus ? (
                        <>
                            <Link to="addnewproduct">
                                <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                    Add New Product
                                </li>
                            </Link>
                            <Link to="/">
                                <li
                                onClick={logout_Handler}
                                className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer"
                                >
                                    Logout
                                </li>
                            </Link>
                        </>
                    ):(
                        <>
                            <Link to="/login">
                                <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                    Login
                                </li>
                            </Link>
                            <Link to="register">
                                <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                    Register
                                </li>
                            </Link>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default NavBar