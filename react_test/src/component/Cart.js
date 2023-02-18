import React, {useContext} from "react";
import {GlobalContext} from "./context/GlobalContext"

const Cart = () => {
    const {cart, IncreaseCounter, DecreaseCounter, RemoveX} = useContext(GlobalContext)
    console.log(cart)
    return(
        <div>
            <div>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Faction</th>
                        <th>Description</th>
                        <th>Image/URL</th>
                        <th>Price</th>
                        <th>Counter</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                    {cart.length > 0 ? (
                        cart.map(item => {
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.model}</td>
                                <td>{item.faction}</td>
                                <td>{item.description}</td>
                                <td><img src={item.url}/></td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => DecreaseCounter(item.id)}>-</button>
                                    Cantidad: {item.counter}
                                    <button onClick={() => IncreaseCounter(item.id)}>+</button>
                                </td>
                                <td>${(item.price * item.counter).toFixed(2)}</td>
                                <td>
                                    <button onClick={() => RemoveX(item.id)}>Remove</button>
                                </td>
                            </tr>
                        })
                    ) : (
                        <tr>
                            <td>No Product Selected</td>
                        </tr>
                    )}
                </table>
            </div>
            <div>
                <h3>Cart Info</h3>
                <h4>Total Items: {cart.length}</h4>
                <h4>TotalCounter:{""}
                    {cart.reduce((sum, items) =>(
                        sum += items.price * items.counter
                    ), 0).toFixed(2)}
                </h4>
                <button>CheckOut</button>
            </div>
        </div>
    )
}
export default Cart