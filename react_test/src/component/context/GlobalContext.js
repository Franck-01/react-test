import React, {createContext, useState, memo} from "react"

const {Provider} = createContext()
const GlobalContext = ({children}) => {
    const [product, set_Product] = useState([])
    
    const add_Products = (prod, counter) => {
        const prods = {
            name: prod.name,
            model: prod.model,
            faction: prod.faction,
            description: prod.description,
            url: prod.url,
            price: prod.price,
            counter: counter
        }
        set_Product([...product, prods])
    }
    const total_Sum = (array) => {
        let count = 0
        array.forEach(prop => count += prop.cost*prop.counter)
        count.toFixed(2)
        return count
    }
    const count_Prod = () => {
        let count = 0
        product.forEach(prod => {count += prod.counter})
        return count
    }
    const in_Cart = (name) => {
        product.some((prods) => prods.name === name)
    }
    const add_Prod = (prod, count) => {
        if 
    }
}