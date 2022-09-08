import React from 'react'
import '../App.css';
//import mySvg from '../icons/shoppy.jpg';
function Editcart({data}) {
  return (
  <div className='carts'>
    <div className='carttitle'><h4><p>{`${data.productname}`}</p>4.5*</h4>
    <h4><p>{`${data.seller}`}</p>245-4</h4></div>
    <img src={`${data.img}`} alt=" " className='imgcarts'/>
    
    <h5>Discount:{`${data.discount}`}<p>PRICE:{`${data.price}`} </p></h5>

    <button className='btn btn-light'>View</button>
    
    {/* <div className='cartbtn'>
       <button className='btn btn-warning'>Edit</button>
    <button className='btn btn-danger btn-lg'>Delete</button> 
    </div> */}
  </div>
  )
}

export default Editcart;