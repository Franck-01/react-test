import React, {useEffect, useState, useContext} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { GlobalContext } from "./context/GlobalContext.js"

const Main = () => {
    const [products, set_Products] = useState([])
    const {cart, AddToCart, UpdateCart} = useContext(GlobalContext)
    useEffect(() => {
        axios({
            url: `http://localhost:7000/products/get_all`,
            method: "get"
        })
        .then((res) => {
            set_Products(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    const AddToCart_Handler = (event) => {
        event.preventDefault()
        let id = event.target.id

        const name = document.getElementById("hiddenname" + id).value;
        const model = document.getElementById("hiddenmodel" + id).value;
        const faction = document.getElementById("hiddenfaction" + id).value;
        const description = document.getElementById("hiddendescription" + id).value;
        const url = document.getElementById("hiddenurl" + id).value;
        const price = document.getElementById("hiddenprice" + id).value;

        const newProp = {
            id,
            name,
            model,
            faction,
            description,
            url,
            price: +price,
            counter: 1
        }
        const findProp = cart.find((item) => item.id === id)
        if (findProp) {
            UpdateCart(id)
            return
        }
        AddToCart(newProp)
    }
    return(
        <main className="w-full">
            <div className="w-full flex justify-center mt-5 mb-4">
                <div className="grid gap-4 grid-cols-3 w-[80%]">
                    {products.map((prop) =>{
                        return(
                            <div className="shadow" key={prop._id}>
                                <img className="h-[250px] w-full " src={prop.url} alt={prop.name}/>
                                <div className="w-[95%] flex justify-between   my-3">
                                    <div className="mx-2">
                                        <h2>{prop.name}</h2>
                                        <h3>{prop.model}</h3>
                                        <h3>{prop.faction}</h3>
                                        <h4>{prop.description}</h4>
                                        <h4>$: {prop.price}</h4>
                                        <input
                                            type="hidden"
                                            value={prop.name}
                                            id={`hiddenname${prop._id}`}
                                        />
                                        <input
                                            type="hidden"
                                            value={prop.model}
                                            id={`hiddenmodel${prop._id}`}
                                        />
                                        <input
                                            type="hidden"
                                            value={prop.faction}
                                            id={`hiddenfaction${prop._id}`}
                                        />
                                        <input
                                            type="hidden"
                                            value={prop.description}
                                            id={`hiddendescription${prop._id}`}
                                        />
                                        <input
                                            type="hidden"
                                            value={prop.url}
                                            id={`hiddenurl${prop._id}`}
                                        />
                                        <input
                                            type="hidden"
                                            value={prop.price}
                                            id={`hiddenprice${prop._id}`}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            id={prop._id}
                                            onClick={AddToCart_Handler}
                                            className=" block py-2 px-5 bg-orange-400 text-white rounded hover:bg-transparent hover:text-orange-400"
                                        >
                                            Add To Cart
                                        </button>
                                        <Link to={`productdetails/${prop._id}`}>
                                            <button className="py-2 px-5 my-2  hover:text-blue-400 rounded bg-transparent text-orange-400">
                                                Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
export default Main