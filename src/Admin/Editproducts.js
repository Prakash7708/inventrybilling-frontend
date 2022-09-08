import React from 'react'
import './Create.css';
import{useFormik} from 'formik';
import { useNavigate } from 'react-router-dom';
import {useState}from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';

function Createproduct() {
  
  let navigate=useNavigate();
  let [loading,setLoading]=useState([]);
  
  let formik=useFormik({
      initialValues:{
          productname:"",
          seller:"",
          img:"",
          discount:"",
          price:"",
          categories:"",
          allproducts:true,
      },
      validate:(values)=>{
         let errors ={}
         return errors;  
      },
      onSubmit:async (values)=>{
           //console.log(values)
        
       try{ 
          //setLoading(true)
          
          await axios.put("/editproduct/:id",values)
           }catch(error){
             
          }
          //navigate("/")
      }
  });
  return (
   
    <div className='creatediv'>
        <div><Link to={"/Admin"} className='btn btn-danger btncreate'>Home</Link></div>
      <div className='details'>
        <h1>CreateProduct</h1>
        <form onSubmit={formik.handleSubmit}>
        <div className='row'>


            <div className='col-lg-12'>
             <label>ProductName:</label>
             <input name="productname" onChange={formik.handleChange} value={formik.values.productname} type="text" className='form-control'/>
             {
                formik.errors.name? <div style={{color:'red'}}>{formik.errors.name}</div>:null
             }
             <label>Seller:</label>
             <input name="seller" onChange={formik.handleChange} value={formik.values.seller} type="text" className='form-control'/>
             <label>IMAGE Link:</label>
             <input name="img" onChange={formik.handleChange} value={formik.values.img} type="text" className='form-control'/>
             {/* {
                formik.isValid ?'true':'false'
             } */}
             
             
            
            </div>
            <div className='col-lg-12'>
            <label>Discount:</label>
            <input name="discount" onChange={formik.handleChange} value={formik.values.discount} type="text" className='form-control'/>
            {
                formik.errors.position? <div style={{color:'red'}}>{formik.errors.position}</div>:null
             }
             <label>Price:</label>
             <input name="price" onChange={formik.handleChange} value={formik.values.price} type="text" className='form-control'/>
             <label>Categories:</label>
             <input name="categories" onChange={formik.handleChange} value={formik.values.categories} type="text" className='form-control'/>
             <input type={'submit'} disabled={!formik.isValid} value="Create Product" className='btn btn-danger btncreate lg mt-2 ml-200'/>
            </div>



        </div>

        </form>
      </div>
    </div>

  )
}

export default Createproduct