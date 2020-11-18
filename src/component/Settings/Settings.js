import React, { useState } from 'react';
import { Form, Input, FormGroup, Col, Label } from 'reactstrap';

function Settings(props) {
  const [schoolName, setSchoolName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')

  return (
    <div className="container-fluid settings">
       <Form className="settings-form">
          <FormGroup row>
              <Col lg={4} >
                  <Label>School Name</Label>
              </Col>
              <Col lg={8}>
                  <Input 
                      type="text" 
                      className="modal-field"
                      value={schoolName} 
                      onChange={(e) => setSchoolName(e.target.value)}
                  />
              </Col>
          </FormGroup>
          <FormGroup row>
              <Col lg={4} >
                  <Label>Address</Label>
              </Col>
              <Col lg={8}>
                  <Input 
                      type="text" 
                      className="modal-field"
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)}
                  />
              </Col>
          </FormGroup>
          <FormGroup row>
              <Col lg={4} >
                  <Label>Pincode</Label>
              </Col>
              <Col lg={8}>
                  <Input 
                      type="text" 
                      className="modal-field"
                      value={pincode} 
                      onChange={(e) => setPincode(e.target.value)}
                  />
              </Col>
          </FormGroup>
          <FormGroup row>
              <Col lg={4} >
                  <Label>Contact Number</Label>
              </Col>
              <Col lg={8}>
                  <Input 
                      type="text" 
                      className="modal-field"
                      value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)}
                  />
              </Col>
          </FormGroup>
          <FormGroup row>
              <Col lg={4} >
                  <Label>Email ID</Label>
              </Col>
              <Col lg={8}>
                  <Input 
                      type="text" 
                      className="modal-field"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </Col>
          </FormGroup>
       </Form>
    </div>
  );
}

export default Settings;