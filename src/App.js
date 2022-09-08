import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Users/Home';
//import Cart from './Users/Cart';
import Adminhome from './Admin/Adminhome';
import Userslogin from './Login/Userslogin';
import Createproduct from './Admin/CreateProduct';
import Homecart from './Users/Homecart';
import Register from './Login/Register';
import Billing from './Users/Billing';
import Homebuy from './Users/Homebuy';
import Orders from './Users/Orders';
import Ordersadmin from './Admin/Ordersadmin';
import Printbill from './Users/Printbill';
import Printcartbill from './Users/Printcartbill';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<Home/>} />
      <Route path="/Cart" element={<Homecart/>} />
      <Route path="/billing" element={<Billing/>} />
      <Route path="/Orders" element={<Orders/>} />
      <Route path="/ordersAdmin" element={<Ordersadmin/>} />
      <Route path="/homebuy/:id" element={<Homebuy/>} />
      <Route path="/print/:id" element={<Printbill/>} />
      <Route path="/printcart" element={<Printcartbill/>} />
      <Route path="/Admin" element={<Adminhome/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/Userslogin" element={<Userslogin/>} />
      <Route path="Admin/Create" element={<Createproduct/>} />

    </Routes>
  </BrowserRouter>
    );
}

export default App;
