import React from "react";
import "./Login.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import { useState } from "react";

function Userslogin() {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {

      try {
        let a = "admin";
        let b = "1234";
        if ((values.username ===a) & (values.password ===b)) {
          navigate("/Admin");
        } else {
          setLoading(true)
          const login = await axios.post(`login`, values);
          if(login.data.token){
            setLoading(false)
          localStorage.setItem("react_app_token", login.data.token);
          navigate("/"); }
          else{
            setLoading(false)
            alert(login.data.message)
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
   <>
{loading ? <div className="loading"><h2><b>Login Processing....</b></h2></div>:
    <div className="login">
      <h1>SHOPIFY</h1>
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
                <input
                  type={"submit"}
                  className={"btn btn-dark form-control"}
                />
              </div>
              <p>
                Dont have account? <Link to={"/Register"}>Sign-in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
}
    </>
  );
}

export default Userslogin;
