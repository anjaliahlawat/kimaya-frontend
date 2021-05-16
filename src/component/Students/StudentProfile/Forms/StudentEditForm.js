import React from 'react';
import { Form, Input, FormGroup, Col, Label } from "reactstrap";

function StudentEditForm({data, handleDataChange}) {

  const formatDate = (d) => {
    const d1 = new Date(d)
    return d1.getDate() + "-" + d1.getMonth() + "-" + d1.getFullYear()
  }

  if(Object.keys(data).length === 0)
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
                          onChange={(e) => handleDataChange(e.target, "student")}
                      />
                  </Col>
              </FormGroup>
              <FormGroup row>
                  <Col lg={4} >
                      <Label>Class</Label>
                  </Col>
                  <Col lg={8}>
                      <Input 
                          type="text" 
                          className="modal-field"
                          name="class"
                          value={data.class} 
                          onChange={(e) => handleDataChange(e.target, "student")}
                      />
                  </Col>
              </FormGroup>
              <FormGroup row>
                  <Col lg={4} >
                      <Label>Month</Label>
                  </Col>
                  <Col lg={8}>
                      <Input 
                          type="text" 
                          className="modal-field"
                          name="month"
                          value={data.month} 
                          readOnly
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
                          value={formatDate(data.admissionDate)} 
                          readOnly
                      />
                  </Col>
              </FormGroup>
    </Form>
  );
}

export default StudentEditForm;