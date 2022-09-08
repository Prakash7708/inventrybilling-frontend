import React from 'react'
import "./Login.css"
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from '../axios';

function Register() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: "",
      email:"",
      password: "",
    },
    onSubmit: async (values) => {
      //alert(values.email)
      try {
        const register = await axios.post(`/register`, values);
        alert(register.data.message);
        navigate("/Userslogin");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className='login'>
        <h1>SHOPYFY</h1>
    <div>
    <div className="container1">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-12">
            <label>Username</label>
            <input
              type={"text"}
              placeholder={"Username"}
              className={"form-control"}
              name={"username"}
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-lg-12">
            <label>Email</label>
            <input
              type={"text"}
              placeholder={"Email"}
              className={"form-control"}
              name={"email"}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-lg-12">
            <label>Password</label>
            <input
              type={"text"}
              placeholder={"Password"}
              className={"form-control"}
              name={"password"}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-lg-12 mt-2">
            <input type={"submit"} className={"btn btn-dark form-control"} />
          </div>
          <p>
            {/* Dont have account? <Link to={"/Register"}>Sign-in</Link> */}
          </p>
        </div>
      </form>
    </div>
    </div>
    </div>
  )
}

export default Register;