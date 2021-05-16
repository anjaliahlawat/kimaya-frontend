import React, { useEffect } from 'react';
import { useState } from 'react';
import { Form, Input, FormGroup, Col, Label } from "reactstrap";

function StudentEditForm({data}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contactNum, setContactNum] = useState('')
  const [address, setAddress] = useState('')
  
  useEffect(() => {
    setName(data.name)
    setEmail(data.email)
    setContactNum(data.contactNum)
    setAddress(data.address)
  }, [data])

  if(data.length === 0)
      return null
  return (
    <Form className="student-form">
              <FormGroup row>
                  <Col lg={4} >
                      <Label>Name</Label>
                  </Col>
                  <Col lg={8}>
                      <Input 
                          type="text" 
                          className="modal-field"
                          name="name"
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                      />
                  </Col>
              </FormGroup>
              <FormGroup row>
                  <Col lg={4} >
                      <Label>Email</Label>
                  </Col>
                  <Col lg={8}>
                      <Input 
                          type="text" 
                          className="modal-field"
                          name="email"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
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
                          name="contactNum"
                          value={contactNum} 
                          onChange={(e) => setContactNum(e.target.value)}
                      />
                  </Col>
              </FormGroup>
              <FormGroup row>
                  <Col lg={4} >
                      <Label>Admission Date</Label>
                  </Col>
                  <Col lg={8}>
                      <Input 
                          type="text" 
                          className="modal-field"
                          name="admissionDate"
                          value={address} 
                          onChange={(e) => setAddress(e.target.value)}
                      />
                  </Col>
              </FormGroup>
    </Form>
  );
}

export default StudentEditForm;