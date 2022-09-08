import React from 'react'
import Addedcarts from './Addedcarts';
import '../App.css';
import axios from "../axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../lotties/97443-loading-gray.json'


function Homecart() {
  const [data, setData] = useState([]);
  const[loading,setLoading]=useState(false)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


  useEffect(() => {
    fetchData();
  }, []);
  let fetchData = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/cartitems",{
        headers: {
          'Authorization': `${localStorage.getItem("react_app_token")}`
        }}
      );
      //alert(res.data.message)
      setLoading(false)
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  let removeCart = async (data) => {
    try {  
    //let res= await axios.post(`/createcart`,data,{
         await axios.post(`/deletecart`,data,{
        headers: {
          'Authorization': `${localStorage.getItem("react_app_token")}`
        }
      });
      //alert(res.data.message)
      fetchData();
    } catch (error) {}
  };

  var total=0
  data.map((input)=>{
  return  total+=parseInt(input.price)
  })
  

  return (
    <>
 {loading ? <div className='loading'><Lottie options={defaultOptions} height={300} width={300}></Lottie></div>:
    <div className='row Addcart'>
      <div className='col-lg-12'>
      <h3 className='Total'>Your Cart Items</h3>
      
        <div className="cartitems">

        {
          data.map((input)=>{
          return  <Addedcarts data={input} removeCart={removeCart}/>
          })
        }
        </div>
      </div>
      <div className='col-lg-12 Total'>
        <div></div>
        <div>
        <h5>Total Price:{total}
        </h5>
        <h5>No.Of.Items: {data.length}</h5>
        </div>
        <Link to={"/billing"} className='btn btn-light'><h6>Order</h6><h6>Products</h6></Link>
      </div>
    </div>
}
    </>
  )
}

export default Homecart;