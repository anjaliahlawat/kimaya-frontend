import React from 'react';
import { Form, Input, FormGroup, Col, Label } from "reactstrap";

function EditForm({data, onEdit}) {
  if(data.length === 0)
      return null
  return (
    <Form className="student-form">
        {data.map((item, key) => {
            return(
              <FormGroup row>
                  <Col lg={4} >
                      <Label>{item.label}</Label>
                  </Col>
                  <Col lg={8}>
                      <Input 
                          type="text" 
                          className="modal-field"
                          name={item.field}
                          value={item.value} 
                          onChange={(e) => onEdit(e.target)}
                          readOnly={!item.editable}
                      />
                  </Col>
              </FormGroup>
            )
        })}
    </Form>
  );
}

export default EditForm;