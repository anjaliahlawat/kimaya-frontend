import React, { useEffect } from 'react';
import { useState } from 'react';
import { Form, Input, FormGroup, Col, Label } from "reactstrap";

function StudentEditForm({data, onEdit}) {
  const [studentName, setStudentName] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [month, setMonth] = useState('')
  const [admissionDate, setAdmissionDate] = useState('')
  
  useEffect(() => {
    setStudentName(data.name)
    setStudentClass(data.class)
    setMonth(data.month)
    setAdmissionDate(formatDate(data.admissionDate))
  }, [data])

  const formatDate = (d) => {
    const d1 = new Date(d)
    return d1.getDate() + "-" + d1.getMonth() + "-" + d1.getFullYear()
  }

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
                          name="studentName"
                          value={studentName} 
                          onChange={(e) => setStudentName(e.target.value)}
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
                          name="studentClass"
                          value={studentClass} 
                          onChange={(e) => setStudentClass(e.target.value)}
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
                          value={month} 
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
                          value={admissionDate} 
                          readOnly
                      />
                  </Col>
              </FormGroup>
    </Form>
  );
}

export default StudentEditForm;