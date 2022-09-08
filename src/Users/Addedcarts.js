import React from 'react'

function Addedcarts(props) {
   

  return (
    <div className="carts">
    <div className="carttitle">
      <h4>
        <p>
            {`${props.data.productname}`}
            </p>4.5*
      </h4>
      <h4>
        <p>
            {`${props.data.seller}`}
            </p>245-4
      </h4>
    </div>
    <img 
    src={`${props.data.img}`}
     alt=" " className="imgcarts" />

    <h5>
       
      Discount:{`${props.data.discount}`}
      <p>PRICE:{`${props.data.price}`} </p>
    </h5>

    <div className="cartbtn">
      {/* <button
        className="btn btn-outline-dark"
        // onClick={()=>props.addtoCart(props.data)}
      >
       kjkn
      </button> */}
      <button className="btn btn-danger btn-lg" onClick={()=>props.removeCart(props.data)}>Remove Product</button>
    </div>
  </div>
  )
}

export default Addedcarts