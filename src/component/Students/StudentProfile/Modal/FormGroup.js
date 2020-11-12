import React from 'react';
import { Input, FormGroup, Col } from "reactstrap";

function InputBox({name, value, label, onChange}) {
  return (
    <FormGroup row>
        <Col lg={12} className="offset-lg-3">
            <Input 
                type="text" 
                className="modal-field"
                name={name}
                placeholder={label}
                value={value} 
                onChange={(e) => onChange(e.target.value)}
            />
        </Col>
    </FormGroup>
  );
}

export default InputBox;