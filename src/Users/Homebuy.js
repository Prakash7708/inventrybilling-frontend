import React from 'react'
import { useEffect, useState} from "react";
import axios from "../axios";
import '../App.css';
import {useNavigate,useParams } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import Lottie from 'react-lottie';
import animationData from '../lotties/97443-loading-gray.json'
//import UserContext from '../Usercontext';
//import { Navigate } from 'react-router-dom';


function Homebuy() {
    const [items, setItems] = useState([]);
    const[loading,setLoading]=useState(false)
    //let dataUpdate=useContext(UserContext);
    let navigate = useNavigate();
    let params=useParams();
    //alert(params.id)
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  

    useEffect(() => {
        buyOne()
      }, []);


      let buyOne = async () => {
        if(localStorage.getItem("react_app_token")){
        try {
          setLoading(true)
      const res= await axios.get(`/orderOneitem/${params.id}`,{
        headers: {
          'Authorization': `${localStorage.getItem("react_app_token")}`
        }
      });
      //alert(res.data)
      setLoading(false)
      setItems(res.data)
    }catch (error) {
        console.log(error)
    }
  }else{
    alert("🔒Please Login to Continue")
    navigate("/")
  }
  };

let makePayment =async (token) => {
  try {  
    //let res= await axios.post(`/createcart`,data,{

      items.allproducts=false
      // const body={
      //   items,
      //   token
      // }
           await axios.post(`/payment`,items,{
        headers: {
          'Authorization': `${localStorage.getItem("react_app_token")}`
        }
      });
      // alert(res.data.message)
      
    } catch (error) {console.log(error)}
   
  //navigate("/")
  navigate(`/print/${params.id}`)
}



return (
<>
    {loading ? <div className='loading'><Lottie options={defaultOptions} height={400} width={400}></Lottie></div> : <div>
    <StripeCheckout name='product' amount={items.price*100} currency='INR'
    stripeKey='pk_test_51LddhjSI5h877L4qnnk886Y8sUn2LDjaFvYEC55fbFmYD5fyezbaO6tMOKatgIIdrDXgIfLzY10MBRTjwQ1EsCOt00RaQ44Xv6'
    token={makePayment}>
      <div className='loading'>
        <div className='pay'>
        <h4><b>Happy Shopping...</b></h4>
      <p><b>ProductName: </b>{items.productname}</p>
      <p><b>Seller: </b>{items.seller}</p>
      <p><b></b></p>
      <button className='btn btn-outline-primary'>Pay ₹{items.price}</button>
      </div>
      </div>
    </StripeCheckout>
  </div>}
  </>     

//     <div>
//   <StripeCheckout>
//     <button>Pay{items.price}</button>
//   </StripeCheckout>
// </div>
//     <>
// <div className='billingContainer'>
//   <div className='bill'>
//   <h1 className=''><b>Shopify</b></h1>
//   <h2>Product Details</h2>
//   <ul>
//       <li> <h5><b>Product Name:{items.productname}</b><br></br>
//      Seller:{items.seller}<span>  </span>Price:{items.price}<span>  </span>Discount:{items.discount}</h5> </li>
//      </ul>
//      <h3>Total Price:{items.price} No.Of.Items:01</h3>
//      <button className='btn btn-primary' onClick={()=>payMent()}>Pay</button>
//      </div>
// </div> 
// </>


  )
}

export default Homebuy;