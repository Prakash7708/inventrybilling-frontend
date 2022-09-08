import React from 'react'
import axios from "../axios";
import { useEffect, useState } from "react";
//import { Link, useNavigate } from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../lotties/97443-loading-gray.json'

function Ordersadmin() {
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
          const res = await axios.get("/ordersAdmin");
          setLoading(false)
          //console.log(res.data)
          setData(res.data);
        } catch (error) {
          console.log(error);
        }
      };

const shiPping =async (id) => {
 try{ 
  setLoading(true)
  await axios.put(`Placeorder/${id}`,true)
  setLoading(false)
  fetchData();
}catch(err){
  console.log(err)
}
}

  return (
    <>
    {loading ? <div className='loading'><Lottie options={defaultOptions} height={300} width={300}></Lottie></div>:
    <div className='orders'>
        <h3><b>All Orders List</b></h3>
        <table className="table table-striped table-dark">
  <thead className="thead-dark">
    <tr>
      <th scope="col">SHOPIFY Orders</th>
      <th scope="col">TransactionID</th>
      <th scope="col">Details</th>
      <th scope="col">Price</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    {
        data.map((input)=>{
            return <tr>
            <th scope="row">➤</th>
            <th>{input._id}</th>
            {input ? <td>{input.productname}</td>:<td>{input.datails}</td> }
            <td>{input.price}</td>
            <td><button onClick={()=>shiPping(input._id)} className={input.allproducts ? "btn btn-success":"btn btn-warning"}>
                {input.allproducts ? "Shipped..":"Shipping"}</button></td>
          </tr>
        })
    }
  </tbody>
</table>
    </div>
}
</>
  )
}

export default Ordersadmin;