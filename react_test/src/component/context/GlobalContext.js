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
        case "UPDATE_CART_COUNTER":
            return {
                ...state,
                cart: state.cart.filter((item) => {
                    return item.id === action.payload
                    ? (item.counter += 0.5)
                    : item.counter;
                }),
            };
        case "INCREASE_COUNTER":
            return {
                ...state,
                cart: state.cart.filter((item) => {
                    return item.id === action.payload
                    ? (item.counter += 0.5)
                    : item.counter;
                }),
            };
        case "DECEASE_COUNTER":
            return {
                ...state,
                cart: state.cart.filter((item) => {
                    return item.id === action.payload
                    ? (item.counter -= 0.5)
                    : item.counter;
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
            type: "UPDATE_CART_COUNTER",
            payload: id,
        })
    }
    const IncreaseCounter = (id) => {
        dispatch({
            type: "INCREASE_COUNTER",
            payload: id,
        })
    }
    const DecreaseCounter = (id) => {
        dispatch({
            type: "DECEASE_COUNTER",
            payload: id,
        });
    }
    const RemoveX = (id) => {
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
                UpdateCart,
                IncreaseCounter,
                DecreaseCounter,
                RemoveX,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider