import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Layout, Modal, Row, Spin, message } from "antd";
import axios from "axios";
// import HeaderCom from "../Components/Header";
// import FooterCom from "../Components/Footer";
import Register from "./Register";

const Login = ({ loginForm, setLoginForm }) => {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLogin = async (formData) => {
    // debugger
    try {
      const response = await axios.post(
        "http://localhost:5050/login",
        formData
      );
      console.log("Login successful:", response.data);
      const { userId, token } = response.data;

      // Store the token in local storage (you can use session storage as well)
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);

      navigate("/notes");
      // You can handle successful sign-up, show a success message, or redirect to another page.
    } catch (error) {
      navigate("/register");
      console.error("Login failed:", error.response.data);
      // You can handle sign-up errors, display an error message, or take appropriate actions.
    }
  };

  const onFinish = () => {
    // debugger
    handleLogin(formData);
  };
          
  return (
    <>
      {/* <HeaderCom /> */}
      <Modal
        width={800}
        title='Login page' 
        visible={loginForm}
        onCancel={() => setLoginForm(false)}
        maskClosable={true}
        footer={false}
      >
        {
          showRegister ? (
            <Register signupForm={true} setSignupForm={true} />
          ) : (
            <Form className="FormDiv" onFinish={onFinish}>
              <Form.Item name="email">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                  // required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  // required
                />
              </Form.Item>
              <div className="btn-div">
              
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Login
                  </Button>
                  <Link to='/forgot-password'>
                    <Button style={{ marginLeft: "2%"}} type="primary">
                      Forgot password
                    </Button>
                  </Link>
                </Form.Item>
                <Form.Item>
                  {/* <Link to="/register" style={{ textAlign: "center" }}> */}
                    <Button type="primary" onClick={() => setShowRegister(true)} >Click here to register</Button>
                  {/* </Link> */}
                  <Link to="/" style={{ textAlign: "center" }}>
                    <Button type="primary" style={{ marginLeft: "2%"}}>Home</Button>
                  </Link>
                </Form.Item>
              </div>
            </Form>
          )
        }
      </Modal>
      
      {/* {loading && <Spin className="loader" size="large" />} */}
      {/* <FooterCom /> */}
    </>
  );
};

export default Login;