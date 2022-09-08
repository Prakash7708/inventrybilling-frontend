import React from 'react'
import { useEffect, useState } from "react";
import axios from "../axios";
import '../App.css';
import {useNavigate } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import Lottie from 'react-lottie';
import animationData from '../lotties/97443-loading-gray.json'
//import UserContext from '../Usercontext';
//import { Navigate } from 'react-router-dom';


function Billing() {
    const [items, setItems] = useState([]);
    const[loading,setLoading]=useState(false)
    
    let navigate = useNavigate();
    
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  
    


    useEffect(() => {
      billingCart();
      }, []);


    let billingCart = async () => {
        try {
          setLoading(true)
          const res = await axios.get("/cartitems",{
            headers: {
              'Authorization': `${localStorage.getItem("react_app_token")}`
            }}
          );
          //alert(res.data.message)
          setLoading(false)
          setItems(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      
      
var total=0
items.map((input)=>{
 return total+=parseInt(input.price)  })

var details=[]
items.map((input)=>{
return details+=("productname :"+input.productname+" "+"Categories :"+input.categories+" "
+"Seller :"+input.seller) })

// const body={
//   datails:`${details}`,
//   items:`${items.length}`,
//   allproducts:false,
//   userid:" "
// }


let makePayment =async (token) => {
  const body={
    productname:`${details}`,
    items:`${items.length}`,
    price:`${total}`,
    allproducts:false,
    userid:" ",
    token
  }
  try {  
        await axios.post(`/cartPayment`,body,{
        headers: {
          'Authorization': `${localStorage.getItem("react_app_token")}`,
        }
      });

      navigate("/printcart")
    } catch (error) {console.log(error)}
}
  return (

<>
    {loading ? <div className='loading'><Lottie options={defaultOptions} height={400} width={400}></Lottie></div> 
    : <div>
    <StripeCheckout name='product' amount={total*100} currency='INR'
    stripeKey='pk_test_51LddhjSI5h877L4qnnk886Y8sUn2LDjaFvYEC55fbFmYD5fyezbaO6tMOKatgIIdrDXgIfLzY10MBRTjwQ1EsCOt00RaQ44Xv6'
    token={makePayment}>
      <div className='loading'>
        <div className='pay'>
        <h2><b>Happy Shopping...</b></h2>
        <ol>
        {
          items.map((input)=>{
            return <li> <h5><b>Product Name:{input.productname}</b><br></br>
            Seller:{input.seller}<span>  </span>Price:{input.price}<span>  </span>Discount:{input.discount}</h5> </li>
          })
        }
        </ol>  
        <h5>TOTAL:{total}</h5>
        <h5>NO.OF.ITEMS:{items.length}</h5>
      <button className='btn btn-outline-primary'>Pay ₹{total}</button>
      </div>
      </div>
    </StripeCheckout>
  </div>}
   
{/* <div className='billingContainer'>
  <div className='bill'>
  <h1 className=''><b>Shopify</b></h1>
  <h2>Product Details</h2>
  <ul>
   
     {items.map((input)=>{
     return <li> <h5><b>Product Name:{input.productname}</b><br></br>
     Seller:{input.seller}<span>  </span>Price:{input.price}<span>  </span>Discount:{input.discount}</h5> </li>
    })}

     </ul>
     <h3>Total Price:{total} No.Of.Items:{items.length}</h3>
     <button className='btn btn-primary' onClick={()=>payMent()}>Pay</button>
     </div>
</div> */}
</>
  )
}

export default Billing;