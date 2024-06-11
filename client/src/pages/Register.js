
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Form, Layout, Modal, Row, Spin, message } from "antd"
import axios from 'axios'
import Login from './Login'


const Register = ({ signupForm, setSignupForm }) => {
    const navigate = useNavigate()
    const [showLogin, setShowLogin] = useState(false);

    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };    

    const handleRegister = async (formData) => {
      try {     
        const response = await axios.post('http://localhost:5050/signup', formData);
        console.log('Sign-up successful:', response.data);
        // navigate('/login')
        setShowLogin(true);
      } catch (error) {
        console.error('Sign-up failed:', error.response.data);
      }
    };

    const onFinish = (e) => {
      handleRegister(formData);
    }

    const handleLoginClick = () => {
      navigate('/login')
      // return <Login loginForm={true} setLoginForm={true}/>
      
    }

    return (
      <>
        {/* <HeaderCom /> */}
        <Modal
          width={800}
          title='Register page' 
          visible={signupForm}
          onCancel={() => setSignupForm(false)}
          maskClosable={true}
          footer={false}
        >

          {
            showLogin ? (
              <Login loginForm={true} setLoginForm={true} />
            ) : (
              <Form className="FormDiv" onFinish={onFinish}>
                <Form.Item name='username'>
                  <input 
                    type="string" 
                    name='username'
                    value={formData.username}
                    placeholder="Enter Your name" 
                    onChange={handleChange} 
                  />
                </Form.Item>
                  <Form.Item name="email">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    placeholder="Enter Your Email" 
                    onChange={handleChange} 
                  />
                </Form.Item>
                <Form.Item name="password">
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    placeholder="Enter your password" 
                    onChange={handleChange} 
                  />
                </Form.Item>
                <div className="btn-div">
                  <Form.Item>
                    <Button htmlType="submit" type="primary">Register</Button>
                  </Form.Item>
                  <Form.Item>
                      <Button type="primary" onClick={() => setShowLogin(true)}>Click here to SignIn</Button>
                  </Form.Item>
                </div>
              </Form>
            )
          }
        
        </Modal>
        {/* {loading && <Spin className="loader" size="large" />} */}
        {/* <FooterCom /> */}
      </>
    )
}

export default Register