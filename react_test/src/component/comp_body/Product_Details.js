import "../../styles/ProductList.css"
import React, { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom";
import {GlobalContext} from "../context/GlobalContext.js"

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
        <div className="itemgroup">
            <div>
                <h2>Nombre: {product.name}</h2>
                <h3>Modelo: {product.model}</h3>
                <p>Faccion: {product.faction}</p>
                <p>Descripcion: {product.description}</p>
                <img src={product.url} alt={product.name} />
                <h3>Price: ${product.price}</h3>
                <h4>Stock: {product.stock}</h4>
            </div>
            <div>
                <button onClick={AddToCart_Handler}>
                    Agregar al carrito
                </button>
            </div>
        </div> 
    )
}

export default ProductDetails_body