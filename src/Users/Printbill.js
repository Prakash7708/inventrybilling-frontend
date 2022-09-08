import React from 'react'
import { useEffect, useState,useRef } from "react";
import axios from "../axios";
import '../App.css';
import {  useNavigate,useParams } from "react-router-dom";
// import StripeCheckout from 'react-stripe-checkout';
// import Lottie from 'react-lottie';
// import animationData from '../lotties/97443-loading-gray.json'
import { useReactToPrint } from "react-to-print";
function Printbill() {

    const [items, setItems] = useState([]);
    //const[loading,setLoading]=useState(false)
    
    //let dataUpdate=useContext(UserContext);
    let navigate = useNavigate();
    let params=useParams();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    useEffect(() => {
        buyOne()
      }, []);


      let buyOne = async () => {
        if(localStorage.getItem("react_app_token")){
        try {
         // setLoading(true)
      const res= await axios.get(`/orderOneitem/${params.id}`,{
        headers: {
          'Authorization': `${localStorage.getItem("react_app_token")}`
        }
      });
      //alert(res.data)
     // setLoading(false)
      setItems(res.data)
    }catch (error) {
        console.log(error)
    }
  }else{
    alert("🔒Please Login to Continue")
    navigate("/")
  }
  };

  return (
    <div ref={componentRef} className='printdiv'>
      
    <div>
    <h5>SHOPIFY</h5>
    <table className="table">
    
    <thead>
      <tr>
        
        <th scope="col">Details</th>
        <th scope="col">Discount</th>
        <th scope="col">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">{items.productname}</th>
        <td>{items.discount}</td>
        <td>{items.price}</td>
      </tr>
    </tbody>
  </table>
  <h5>Final Price:{items.price}</h5>
  <button className='btn btn-primary' onClick={handlePrint}>Print</button></div>
  </div>
  )
}

export default Printbill