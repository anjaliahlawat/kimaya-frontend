import React from 'react';
import { Form, Input, FormGroup, Col, Label } from "reactstrap";

function EditForm({data, onEdit}) {
  return (
    <Form>
        {data.map((item, key) => {
            return(
              <FormGroup row>
                 <Label>{item.label}</Label>
                  <Col lg={6} className="offset-lg-3">
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