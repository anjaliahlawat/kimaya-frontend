import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {Form, FormGroup, Col, Input} from 'reactstrap';
import {gotError, isLoggingIn, login} from '../store/login';
import logo from "../assets/logo.PNG";
import Loading from './common/Loading';

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  let loggingIn = useSelector(isLoggingIn)
  let error = useSelector(gotError)

  useEffect(() => {
  }, [loggingIn, error])

  const onSubmit = async (event) => {
    event.preventDefault()
    if(email && password){
        const formData = {
          'email' : email,
          'password' : password
        }
        try{
          await dispatch(login(formData))
        }
        catch(ex){
            console.log(ex)
        }
    }    
  }

  if(loggingIn)
      return(<Loading message={'Logging In'}/>)

  return (
    <div className="login">
      <div className="header">
          <Image src={logo} />
      </div>
      
      <Form onSubmit={onSubmit}>
            {error && <p className="error">Invalid Credentials</p>}
            <FormGroup row>
                <Col lg={6} className="offset-lg-3">
                    <Input 
                        type="email" 
                        className="login-field"
                        id="#email"
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
                        id="#password"
                        className="login-field" 
                        placeholder={'Password'}
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Col>
            </FormGroup>
            <Col lg={6} className="offset-lg-3">
                <button className="submit-btn">Login</button>
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