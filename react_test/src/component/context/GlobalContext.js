import React, {createContext, useReducer} from "react"

const initialState = {
    isAuth: false,
    cart: []
}

const Reducer = (state, action) => {
    switch (action.type) {
        case "ISLOGGED_IN":
            return {
                ...state,
                IsLoggIn: action.payload,
            };
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.payload.data],
            };
        case "UPDATE_CART_QUANTITY":
            return {
                ...state,
                cart: state.cart.filter((item) => {
                    return item.id === action.payload
                    ? (item.quantity += 0.5)
                    : item.quantity;
                }),
            };
        case "INCREASE_QUANTITY":
            return {
                ...state,
                cart: state.cart.filter((item) => {
                    return item.id === action.payload
                    ? (item.quantity += 0.5)
                    : item.quantity;
                }),
            };
        case "DECEASE_QUANTITY":
            return {
                ...state,
                cart: state.cart.filter((item) => {
                    return item.id === action.payload
                    ? (item.quantity -= 0.5)
                    : item.quantity;
                }),
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                cart: [...state.cart.filter((item) => item.id !== action.payload)],
            };
        default:
            return state; 
    }
};
export const GlobalContext = createContext(initialState)
export const GlobalContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    const LoggerIn = (data) => {
        dispatch({
            type: "ISLOGGED_IN",
            payload: data,
        })
    }
    const AddToCart = (data) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: { data },
        })
    }
    const UpdateCart = (id) => {
        dispatch({
            type: "UPDATE_CART_QUANTITY",
            payload: id,
        })
    }
    const IncreaseQuantity = (id) => {
        dispatch({
            type: "INCREASE_QUANTITY",
            payload: id,
        })
    }
    const decreaseQuantity = (id) => {
        dispatch({
            type: "DECEASE_QUANTITY",
            payload: id,
        });
    }
    const removeItem = (id) => {
        dispatch({
            type: "REMOVE_ITEM",
            payload: id,
        });
    }
    return (
        <GlobalContext.Provider
            value={{
                LoggerIn,
                LoginStatus: state.IsLoggIn,
                cart: state.cart,
                AddToCart,
                
            }}
        >

        </GlobalContext.Provider>
    )
}