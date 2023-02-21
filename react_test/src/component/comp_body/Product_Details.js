import React, { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom";
import {GlobalContext} from "../context/GlobalContext.js"
import axios from "axios";

const ProductDetails_body = () => {
    const params = useParams()
    const product_Id = params.product_id

    const {cart, AddToCart, UpdateCart} = useContext(GlobalContext)
    const [product, set_Product] = useState([])

    useEffect(() => {
        axios({
            url: `http://localhost:7000/products/get_all/${product_Id}`,
            method: "get"
        })
        .then((res) => {
            set_Product(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [product_Id])

    const AddToCart_Handler = () => {
        const newProd = {
            id: product._id,
            name: product.name,
            model: product.model,
            faction: product.faction,
            description: product.description,
            url: product.url,
            price: +product.price,
            counter: 1
        }
        const find_Prod = cart.find((item) => item.id === product._id)
        if (find_Prod) {
            UpdateCart(product._id)
            return
        }
        AddToCart(newProd)
    }
    return(
        <div className="w-full h-100 mt-5 flex justify-center ">
            <div className="w-[80%] mt-[90px] grid gap-4 grid-cols-2">
                <div>
                    <img src={product.url} alt={product.name} className="w-full" />
                </div>
                <div className="grid gap-4">
                    <div>
                        <h2 className="hover:text-orange-400">Nombre: {product.name}</h2>
                        <h3 className="hover:text-orange-400">Modelo: {product.model}</h3>
                        <p className="hover:text-orange-400">Faccion: {product.faction}</p>
                        <p className="hover:text-orange-400">Descripcion: {product.description}</p>
                        <h3 className="my-2">Price: ${product.price}</h3>
                        <h4 className="my-2">Stock: {product.stock}</h4>
                    </div>
                    <div>
                        <button 
                            className="w-full self-end block py-2 px-5 bg-orange-400 text-white rounded hover:bg-transparent hover:text-orange-400"
                            onClick={AddToCart_Handler}>
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ProductDetails_body