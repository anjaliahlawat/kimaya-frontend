import React from 'react';
import { Form, Input, FormGroup, Col, Label } from "reactstrap";

function ParentEditForm({data, handleDataChange}) {

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
                          value={data.name} 
                          onChange={(e) => handleDataChange(e.target, "parent")}
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
                          value={data.email} 
                          onChange={(e) => handleDataChange(e.target, "parent")}
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
                          value={data.contactNum} 
                          onChange={(e) => handleDataChange(e.target, "parent")}
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
                          name="address"
                          value={data.address} 
                          onChange={(e) => handleDataChange(e.target, "parent")}
                      />
                  </Col>
              </FormGroup>
    </Form>
  );
}

export default ParentEditForm;