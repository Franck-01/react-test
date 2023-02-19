import "../styles/Main.css"
import React, {useEffect, useState, useContext} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { GlobalContext } from "./context/GlobalContext"

const Main = () => {
    const [products, set_Products] = useState([])
    const {cart, AddToCart, UpdateCart} = useContext(GlobalContext)
    useEffect(() => {
        axios({
            url: `http://localhost:7000/products/get_all`,
            method: "get"
        })
        .then((res) => {
            set_Product(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    const AddToCart_Handler = (event) => {
        event.preventDefault()
        let id = event.target.id
    }
}