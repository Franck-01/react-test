import React, {useContext} from "react";
import {GlobalContext} from "./context/GlobalContext.js"

const Cart = () => {
    const {cart, IncreaseCounter, DecreaseCounter, RemoveX} = useContext(GlobalContext)
    console.log(cart)
    return(
        <div className="w-full min-h-full flex justify-center">
            <div className="w-[95%] mt-[90px] flex justify-between">
                <div className="w-[70%]">
                <table className="w-full border-collapse border border-slate-400">
                    <tr className="bg-slate-300">
                            <th className="border border-slate-700 p-3 ">Name</th>
                            <th className="border border-slate-700 p-3 ">Model</th>
                            <th className="border border-slate-700 p-3 ">Faction</th>
                            <th className="border border-slate-700 p-3 ">Description</th>
                            <th className="border border-slate-700 p-3 ">Image/URL</th>
                            <th className="border border-slate-700 p-3 ">Price</th>
                            <th className="border border-slate-700 p-3 ">Counter</th>
                            <th className="border border-slate-700 p-3 ">Total</th>
                            <th className="border border-slate-700 p-3 ">Actions</th>
                        </tr>
                        {cart.length > 0 ? (
                            cart.map((item) => {
                                return(
                                    <tr className="hover:bg-slate-100">
                                        <td className="border border-slate-300 text-center">
                                            {item.name}
                                        </td>
                                        <td className="border border-slate-300 text-center">
                                            {item.model}
                                        </td>
                                        <td className="border border-slate-300 text-center">
                                            {item.faction}
                                        </td>
                                        <td className="border border-slate-300 text-center">
                                            {item.description}
                                        </td>
                                        <td className="border border-slate-300 text-center">
                                            <img src={item.url} alt={item.name} className="w-20 h-20"/>
                                        </td>
                                        <td className="border border-slate-300 text-center">
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <td className="border border-slate-300 text-center">
                                            <button 
                                                onClick={() => DecreaseCounter(item.id)}
                                                className="py-1 px-2 focus:border border-orange-300 mx-2 font-bold text-2xl"   
                                            >-</button>
                                            Cantidad: {item.counter}
                                            <button 
                                                onClick={() => IncreaseCounter(item.id)}
                                                className="py-1 px-2 focus:border border-orange-300 mx-2 font-bold text-2xl"
                                            >+</button>
                                        </td>
                                        <td className="border border-slate-300 text-center">
                                            ${(item.price * item.counter).toFixed(2)}
                                        </td>
                                        <td className="border border-slate-300 text-center">
                                            <button 
                                                onClick={() => RemoveX(item.id)}
                                                className="py-1 px-2 rounded bg-red-500 text-white"
                                            >Remove</button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center font-bold text-3xl">
                                    No Product Selected
                                </td>
                            </tr>
                        )}
                    </table>
                </div>
                <div className="w-[25%] shadow py-3 px-2 flex justify-center">
                    <div className="w-[95%]">
                        <h3 className="text-3xl fond-bold text-gray-600 text-center my-4 w-full border border-b-slate-200">
                            Cart Info
                        </h3>
                        <h4 className="text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">Total Items: {cart.length}</h4>
                        <h4 className="text-bold text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">
                            TotalCounter:{""}
                            {cart.reduce((sum, items) =>(
                                sum += items.price * items.counter
                            ), 0).toFixed(2)}
                        </h4>
                        <h4 className="text-bold text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">
                            Total Price:{" "}
                            $ {cart.reduce((sum, items) => (sum += items.price * items.quantity), 0).toFixed(2)}
                        </h4>
                        <button className="bg-orange-400 rounded px-3 py-2 text-white w-full my-4">
                            CheckOut
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart