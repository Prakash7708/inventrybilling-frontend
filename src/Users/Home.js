import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../icons/shoplogo.png";
import searchicon from "../icons/searchicon.png";
import home from "../icons/Home.png";
import history from "../icons/history.png";
import login from "../icons/User.png";
import cart from "../icons/cart.png";
import Cart from "./Cart";
import { useEffect, useState} from "react";
import Lottie from 'react-lottie';
import animationData from '../lotties/97443-loading-gray.json';


import axios from "../axios";
function Home() {
  const[loading,setLoading]=useState(false)
  const[search,setSearch]=useState(false)

  const [data, setData] = useState([]);
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
    fetchData();
  }, []);



  let fetchData = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/getallproducts");
      setLoading(false)
      setSearch(false)
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  let fetchData1 = async (id) => {
    try {
      setLoading(true)
      const res = await axios.get(`/products/${id}`);
      setLoading(false)
      setSearch(true)
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  async function fetchData2(query) {
    try {
      if (query.length > 3) {
        if (query === "redmi") {
          if (query.length === 5) {
            setLoading(true)
            const res = await axios.get("redmi");
            setLoading(false)
            setData(res.data);
          } else if (query.length > 5) {
            //const res= await axios.get("redmi5");
          }
        } else if (query === "samsung") {
          setLoading(true)
          const res = await axios.get("samsung");
          setLoading(false)
          setData(res.data);
        } else {
          let id = query;

          fetchData1(id);
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  let doLogin = () => {
    if(localStorage.getItem("react_app_token")){
    localStorage.removeItem("react_app_token");
     alert("logout")
    
    navigate("/");
  }else{
     navigate("/Userslogin");
    }
  };

  



  let addtoCart = async (data) => {
    try {  
      if(data.productname){
        setLoading(true)
   const res= await axios.post(`/createcart`,data,{
        headers: {
          'Authorization': `${localStorage.getItem("react_app_token")}`
        }
      });
      setLoading(false)
      alert(res.data.message)}
      else{
        console.log("cart call empty")
      }
    } catch (error) {console.log(error)}
  };



  let gotoCart = async (data) => {
    try {  
      const res = await axios.get("/cartitems",{
        headers: {
          'Authorization': `${localStorage.getItem("react_app_token")}`
        }}
      );
      
      if(res.data.message==="🔒Please Login to Continue"){
        alert(res.data.message)
        navigate("/");
      }else{

        navigate("/cart")
        
      }
    } catch (error) {}
  };

  let ordErs = () => {
    if(localStorage.getItem("react_app_token")){
    navigate("Orders");
  }else{
     alert("Please Login to Continue")
    }
  };
  
  return (
    <>
      {/* navbar */}
      <div className="navbar1">
        <div className="imgnav"><img src={logo} alt="" /><b>SHOPIFY</b></div>
        <div>
          <img src={searchicon} alt="" className="searchimg" />
          <input
            type="search"
            placeholder="Search"
            className="search"
            onChange={(e) => fetchData2(e.target.value)}
          />
        </div>
        <p className={search ? "":"p"} onClick={() => fetchData()}>All Products</p>
        <p onClick={() => fetchData1("Electronics")}>Electronics</p>
        <p onClick={() => fetchData1("Toys")}>Toys</p>
        <p onClick={() => fetchData1("Fashion")}>Fashion</p>
        <p onClick={() => fetchData1("Sports")}>Sports</p>
        <p onClick={() => fetchData1("Books")}>Books</p>
      </div>
      {/* sidebar */}
      <div className="row">
        <div className="col-lg-1">
          <div className="sidebar">

            <Link to={"/"}>
              <img src={home} alt=" " className="sideicon" />
            </Link>
            <p className="sideiname">Home</p>

            {/* <p onClick={()=>ordErs()}>
              <img src={history} alt="" className="sideicon" />
            </p>
            <p className="sideiname">Your Orders</p> */}


            <div onClick={()=>ordErs()}>
              <img src={history} alt="" className="sideicon"/>
              <p> </p>
              <p className="sideiname">Your Orders</p>
            </div>

            <div onClick={()=>doLogin()}>
              <img src={login} alt="" className="sideicon" />
              <p> </p>
              <p className="sideiname">Login /<p onClick={()=>doLogin()}>Logout</p></p>
            </div>
            
            <div onClick={() =>gotoCart()}>
              <img src={cart} alt=" " className="sideicon" />
              <p></p>
              <p className="sideiname">Cart</p>
            </div>
           
          </div>
        </div>
        <div className="col-lg-11 homecarts">
    

         { loading ? <div className="billingContainer">
       <Lottie options={defaultOptions} height={400} width={400}></Lottie> 
    </div>:<div className="cartitems">
            {data.map((input) => {
              return <Cart data={input} addtoCart={addtoCart}/>;
            })}
          </div>}


        </div>
      </div>
    </>
  );
}

export default Home;
