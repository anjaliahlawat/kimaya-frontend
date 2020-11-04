import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {Form, FormGroup, Col, Input} from 'reactstrap';
import {login} from '../store/login';
import logo from "../assets/logo.PNG";

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const onSubmit = async (event) => {
    event.preventDefault()
    if(email && password){
        const formData = {
          'email' : email,
          'password' : password
        }
        await dispatch(login(formData))
    }    
  }

  return (
    <div className="login">
      <div className="header">
          <Image src={logo} />
      </div>
      
      <Form onSubmit={onSubmit}>
          <FormGroup row>
                <Col lg={6} className="offset-lg-3">
                    <Input 
                        type="email" 
                        className="login-field"
                        placeholder={'Email'} 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col lg={6} className="offset-lg-3">
                    <Input 
                        type="password" 
                        className="login-field" 
                        placeholder={'Password'}
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Col>
            </FormGroup>
            <Col lg={6} className="offset-lg-3">
                <button>Login</button>
            </Col>
            <Col lg={6} className="footer-text offset-lg-3">
                <span>Create your account for free.</span>
                <Link to={'/register'}> Register</Link>
            </Col>
      </Form>        
    </div>
  );
}

export default Login;