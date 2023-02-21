import React, {useEffect, useContext} from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookie from 'js-cookie';

import Main from './component/Main';
import Cart from './component/Cart';
import NavBar from './component/NavBar';

import Login_body from './component/comp_body/Login_body'
import AddNewProduct from './component/comp_body/NewProduct'
import Register_body from './component/comp_body/Register_body'
import ProductDetails_body from './component/comp_body/Product_Details'

import { GlobalContext } from './component/context/GlobalContext';

function App() {
  const navigate = useNavigate();
  const {LoggerIn} = useContext(GlobalContext);

  const token = Cookie.get("jwt_token")
  useEffect(() => {
    axios.post(
      "http://localhost:7000/very_account",
      {token},
      {withCredentials: true}
    )
    .then((res) => {
      console.log(res)
      if (!res.data.status) {
        Cookie.remove("jwt_token");
        navigate("/");
        LoggerIn(false);
      } else {
        LoggerIn(true);
      }
    })
    .catch((err) => {
      console.log(`Request err: ${err}`);
    });
  }, [navigate]);
  return (
    <div className="App">
      <div className="fixed w-full">
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login_body />} />
        <Route path="register" element={<Register_body />} />
        <Route path="addnewproduct" element={<AddNewProduct />} />
        <Route path="productdetails/:product_Id" element={<ProductDetails_body />} />
      </Routes>
    </div>
  );
}

export default App;
