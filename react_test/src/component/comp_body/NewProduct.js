import React, {useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddNewProduct = () => {
    const [input, set_input] = useState({
        name: "",
        model: "",
        faction: "",
        description: "",
        url: "",
        price: "",
        stock: ""
    })
    const onChange_Handler = (e) => {
        const {name, value} = e.target
        set_input((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const Submit_Handler = (e) => {
        e.preventDefault()
        axios({
            url: "http://localhost:/products/add",
            method: "post",
            data: {...input}
        }).then((res) => {
            console.log(res)
            if (res.data.success === 0) {
                toast.error(res.data.error[0].msg, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
            if (res.data.status === 1) {
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
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return(
        <div className="w-full absolute mt-[80px] flex justify-center items-center">
            <form
                className="bg-white p-4 shadow-md border rounded my-5 py-3" 
                onSubmit={Submit_Handler}>
                <h2 className="text-center w-full p-3 text-gray-500 text-xl font-bold">
                    Add New Product
                </h2>
                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" htmlFor="name">
                        Product Name
                    </label>
                    <input 
                        type="text"
                        id="name"
                        placeholder="Product Name" 
                        name="name" 
                        value={input.name} 
                        onChange={onChange_Handler}
                        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
                    />
                </div>
                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" htmlFor="model">
                        Product Model
                    </label>
                    <input 
                        type="text"
                        id="model"
                        placeholder="Product Model" 
                        name="model" 
                        value={input.model} 
                        onChange={onChange_Handler}
                        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md  border border-gray-500 rounded"
                        />
                </div>
                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" htmlFor="faction">
                        Product Faction
                    </label>
                    <input 
                        type="text"
                        id="faction"
                        placeholder="Product Faction" 
                        name="faction" 
                        value={input.faction} 
                        onChange={onChange_Handler}
                        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md  border border-gray-500 rounded"
                        />
                </div>
                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" htmlFor="description">
                        Product Description
                    </label>
                    <textarea 
                        type="text"
                        id="description"
                        placeholder="Product description" 
                        name="description" 
                        value={input.description} 
                        onChange={onChange_Handler}
                        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md  border border-gray-500 rounded"
                        ></textarea>
                </div>
                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" htmlFor="url">
                        Product Image/Url
                    </label>
                    <textarea 
                        type="text"
                        id="url"
                        placeholder="Product Image/Url" 
                        name="url" 
                        value={input.url} 
                        onChange={onChange_Handler}
                        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md  border border-gray-500 rounded"
                        ></textarea>
                </div>
                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" htmlFor="price">
                        Product Price
                    </label>
                    <input 
                        type="number"
                        id="price"
                        placeholder="Product Price" 
                        name="price" 
                        value={input.price} 
                        onChange={onChange_Handler}
                        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md  border border-gray-500 rounded"
                        />
                </div>
                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" htmlFor="stock">
                        Product Stock
                    </label>
                    <input 
                        type="number"
                        id="stock"
                        placeholder="Product Stock" 
                        name="stock" 
                        value={input.stock} 
                        onChange={onChange_Handler}
                        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md  border border-gray-500 rounded"
                        />
                </div>
                <div className="flex justify-between items-center my-3 mb-5">
                    <button className="text-white font-bold bg-blue-500 py-2 px-3 border rounder hover:bg-blue-700">
                        Add New Product
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
export default AddNewProduct;