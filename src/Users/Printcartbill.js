import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "../axios";
import "../App.css";
import {  useNavigate} from "react-router-dom";
// import StripeCheckout from "react-stripe-checkout";
// import Lottie from "react-lottie";
// import animationData from "../lotties/97443-loading-gray.json";
import { useReactToPrint } from "react-to-print";
function Printcartbill() {
  const [items, setItems] = useState([]);
  //const [loading, setLoading] = useState(false);
  const componentRef = useRef();

  //let dataUpdate=useContext(UserContext);
  let navigate = useNavigate();
  //let params = useParams();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    buyOne();
  }, []);

  let buyOne = async () => {
    if (localStorage.getItem("react_app_token")) {
      try {
        //setLoading(true);
        const res = await axios.get(`/cartitems`, {
          headers: {
            Authorization: `${localStorage.getItem("react_app_token")}`,
          },
        });
        //alert(res.data)
        //setLoading(false);
        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("🔒Please Login to Continue");
      navigate("/");
    }
  };

  var total = 0;
  items.map((input) => {
  return  total += parseInt(input.price);
  });

  return (
    <div ref={componentRef} className="printdiv">
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
            {/* <th scope="row">{items.productname}</th>
        
        <td>{items.price}</td> */}
            {items.map((input) => {
              return (
                <tr>
                  <th scope="row">{input.productname}</th>
                  <th scope="row">{input.discount}</th>
                  <th scope="row">{input.price}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h5>Total Price:{total}</h5>
        <button className="btn btn-primary" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
}

export default Printcartbill;
