import React, { useState } from 'react';
import {Form, FormGroup, Col, Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { gotError, isLoading, register} from '../store/register';
import logo from "../assets/logo.PNG";
import Loading from './common/Loading';

function Register(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const dispatch = useDispatch()
  let loading = useSelector(isLoading)
  let error = useSelector(gotError)

  const onSubmit = async (event) => {
    event.preventDefault()
    const formData = {
      'email' : email,
      'password' : password,
      'name' : userName,
    }
    if(isValid()){
      // console.log(formData)
      await dispatch(register(formData))
    }
  }

  const isValid = () => {
     if(email && password && userName)
        return true
     return false
  }

  if(loading)
      return(<Loading message={'Creating your account..'}/>)

  return (
    <div className="register">
        <div className="header">
            <Image src={logo} />
        </div>
        <Form onSubmit={onSubmit}>
        {error && <p className="error">Couldn't register you. Try again!</p>}
          <FormGroup row>
                <Col md={6} className="offset-lg-3">
                    <Input type="text" 
                        className="register-field" 
                        placeholder={'Username'}
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                        required
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
                        required
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
                      required
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