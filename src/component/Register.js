import React, { useState } from 'react';
import {Form, FormGroup, Col, Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { register} from '../store/register';
import logo from "../assets/logo.PNG";

function Register(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const dispatch = useDispatch()

  const onSubmit = async (event) => {
    event.preventDefault()
    const formData = {
      'email' : email,
      'password' : password,
      'name' : userName,
    }
    // console.log(formData)
    await dispatch(register(formData))
  }

  return (
    <div className="register">
        <div className="header">
            <Image src={logo} />
        </div>
        <Form onSubmit={onSubmit}>
          <FormGroup row>
                <Col md={6} className="offset-lg-3">
                    <Input type="text" 
                        className="register-field" 
                        placeholder={'Username'}
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Col>
            </FormGroup>
          <FormGroup row>
                <Col md={6} className="offset-lg-3">
                    <Input 
                        type="email" 
                        className="register-field" 
                        placeholder={'Email'}
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Col>
            </FormGroup>
          <FormGroup row>
              <Col md={6} className="offset-lg-3">
                  <Input type="password" 
                      className="register-field"
                      placeholder={'Password'} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </Col>
          </FormGroup>
          <Col md={6} className="offset-lg-3">
                <button>Sign up</button>
            </Col>
            <Col md={12} className="footer-text">
                <span>Already a user?</span>
                <Link to={'/login'}> Login</Link>
            </Col>
      </Form>     
    </div>
  );
}

export default Register;