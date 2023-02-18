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
        <div>
            <form onSubmit={Submit_Handler}>
                <h2>Add New Product</h2>
                <div>
                    <label htmlFor="name">Product Name</label>
                    <input 
                        type="text"
                        id="name"
                        placeholder="Product Name" 
                        name="name" 
                        value={input.name} 
                        onChange={onChange_Handler}/>
                </div>
                <div>
                    <label htmlFor="model">Product Model</label>
                    <input 
                        type="text"
                        id="model"
                        placeholder="Product Model" 
                        name="model" 
                        value={input.model} 
                        onChange={onChange_Handler}/>
                </div>
                <div>
                    <label htmlFor="faction">Product Faction</label>
                    <input 
                        type="text"
                        id="faction"
                        placeholder="Product Faction" 
                        name="faction" 
                        value={input.faction} 
                        onChange={onChange_Handler}/>
                </div>
                <div>
                    <label htmlFor="description">Product Description</label>
                    <textarea 
                        type="text"
                        id="description"
                        placeholder="Product description" 
                        name="description" 
                        value={input.description} 
                        onChange={onChange_Handler}></textarea>
                </div>
                <div>
                    <label htmlFor="url">Product Image/Url</label>
                    <textarea 
                        type="text"
                        id="url"
                        placeholder="Product Image/Url" 
                        name="url" 
                        value={input.url} 
                        onChange={onChange_Handler}></textarea>
                </div>
                <div>
                    <label htmlFor="price">Product Price</label>
                    <input 
                        type="number"
                        id="price"
                        placeholder="Product Price" 
                        name="price" 
                        value={input.price} 
                        onChange={onChange_Handler}/>
                </div>
                <div>
                    <label htmlFor="stock">Product Stock</label>
                    <input 
                        type="number"
                        id="stock"
                        placeholder="Product Stock" 
                        name="stock" 
                        value={input.stock} 
                        onChange={onChange_Handler}/>
                </div>
                <div>
                    <button>Add New Product</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
export default AddNewProduct;