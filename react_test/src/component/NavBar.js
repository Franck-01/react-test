import "../styles/NavBar.css"
import React, {useContext, useState} from "react"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { Link } from "react-router-dom"
import Cookie from "js-cookie"
import { GlobalContext } from "./context/GlobalContext"

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
        <div>
            <h1>E-COMMERCE</h1>
            <ul>
                <Link to="/"><li>Home</li></Link>
                <Link to="cart"><li>Cart <span>{cart.length}</span></li></Link>
                {LoginStatus ? (
                    <>
                        <Link to="addnewproduct"><li>Add New Product</li></Link>
                        <Link to="/"><li onClick={logout_Handler}>LogOut</li></Link>
                    </>
                ) : (
                    <>
                        <Link to="/login"><li>Login</li></Link>
                        <Link to="register"><li>Register</li></Link>
                    </>
                )}
            </ul>
            <div>
                {nav ? (
                    <AiOutlineClose onClick={toggle_Nav} />
                ) : (
                    <AiOutlineMenu onClick={toggle_Nav} />
                )}
            </div>
            <div className={nav
            ? `md:hidden fixed top-0 left-0 h-[100%] w-60 bg-[#000300] ease-in-out duration-300`
            : `hidden `}>
                <h1>E-COMMERCE</h1>
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="cart"><li>Cart</li></Link>
                    {LoginStatus ? (
                        <>
                            <Link to="addnewproduct"><li>Add New Product</li></Link>
                            <Link to="/"><li onClick={logout_Handler}>LogOut</li></Link>
                        </>
                    ):(
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="register">Register</Link>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default NavBar