import React from "react";

import "../App.css";
import logo from "../icons/shoplogo.png";
import searchicon from "../icons/searchicon.png";
import home from "../icons/Home.png";
import history from "../icons/history.png";
import login from "../icons/User.png";
import cart from "../icons/cart.png";
//import Cart from "../Users/Cart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";
import Editcart from "./Editcart";

function Adminhome() {

  const [data, setData] = useState([]);
  const[loading,setLoading]=useState(false)
  const[search,setSearch]=useState(false)
  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/getallproducts");
      //console.log(res.data)
      setSearch(false)
      setLoading(false)
      setData(res.data);
    } catch (error) {
      console.log(error);
    }}

    let fetchData1 = async (id) => {
      try {
        //let values={id}
        // alert(id)
        setLoading(true)
        const res = await axios.get(`/products/${id}`);
        //alert(res.data)
        setSearch(true)
        setLoading(false)
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
              setData(res.data);
              setLoading(false)
            } else if (query.length > 5) {
              //const res= await axios.get("redmi5");
            }
          } else if (query === "samsung") {
            setLoading(true)
            const res = await axios.get("samsung");
            setData(res.data);
            setLoading(false)
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



  return (
    <>
      {/* navbar */}
      <div className="navbar1">
        
        <div className="imgnav"><img src={logo} alt="" /><b>SHOPIFY Admin</b></div>
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
            <Link to="/Admin">
              <img src={home} alt=" " className="sideicon" />
            </Link>
            <p className="sideiname">Home</p>
           
            <Link to={"Create"}>
              <img src={cart} alt="" className="sideicon" />
              
            </Link>
            <p className="sideiname">Create<p>Products</p></p>
            <Link to={"/ordersAdmin"}>
              <img src={history} alt="" className="sideicon" />
              
            </Link>
            <p className="sideiname">Product Orders</p>
            <Link to={"/"}>
              <img src={login} alt=" " className="sideicon" />
              
            </Link>
            <p className="sideiname">Logout</p>
          </div>
        </div>
        <div className="col-lg-11 homecarts">
          <div className="cartitems">
             
          {/* {data.map((input) => {
              
              return <Editcart data={input}/>;
            })} */}

{ loading ? <div className="billingContainer"><h2>Loading please wait....</h2>
       {/* <Lottie options={defaultOptions} height={100} width={100}></Lottie>  */}
    </div>:<div className="cartitems">
            {data.map((input) => {
              // return <Cart cartitems={cartitems} data={input} handleAddtoCart={handleAddtoCart} />
              return <Editcart data={input}/>;
            })
          
            }
          </div>}
          
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminhome
