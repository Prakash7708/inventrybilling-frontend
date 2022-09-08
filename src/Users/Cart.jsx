import React from "react";
import "../App.css";
import { Link} from "react-router-dom";

//import mySvg from '../icons/shoppy.jpg';
function Cart(props) {
  // let addtoCart = async (id) => {
  //   alert(localStorage.getItem("react_app_token"))
  //   try{
  //     await axios.post(`/createcart`, {
  //       headers: {
  //         'Authorization': `${localStorage.getItem("react_app_token")}`
  //       }
  //     });
      
  //   }catch(error){

  //   }
  // };
  return (
    <div className="carts">
      <div className="carttitle">
        <h4>
          <p>{`${props.data.productname}`}</p>4.5*
        </h4>
        <h4>
          <p>{`${props.data.seller}`}</p>245-4
        </h4>
      </div>
      <img src={`${props.data.img}`} alt=" " className="imgcarts" />

      <h5>
        Discount:{`${props.data.discount}`}
        <p>PRICE:{`${props.data.price}`} </p>
      </h5>

      <div className="cartbtn">
        <button
          className="btn btn-outline-dark"
          onClick={()=>props.addtoCart(props.data)}
        >
          Add To Cart
        </button>
        {/* <button to={"/billing"} className="btn btn-warning btn-lg" onClick={()=>props.orderOneitem(props.data._id)}
        >BUY PRODUCT</button> */}
         <Link to={`/homebuy/${props.data._id}`} className="btn btn-warning btn-lg" 
        >BUY PRODUCT</Link>
      </div>
    </div>
  );
}

export default Cart;
