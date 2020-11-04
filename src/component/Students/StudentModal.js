import React, { useState } from 'react';
import { Form, Modal, ModalHeader, ModalBody, Input, FormGroup, Col } from "reactstrap";

function StudentModal({isModalOpen, toggleModal}){
  const [studentName, setName] = useState('')
  const [admissionNo, setAdmissionNo] = useState('')
  const [studentClass, setClass] = useState('')

  const onSubmit = (e) => {

  }

    return (
      <Modal className="student-modal" isOpen={isModalOpen} toggle={toggleModal} 
          size="md" aria-labelledby="contained-modal-title-vcenter" centered>
          <ModalHeader>
                  New Student
          </ModalHeader>
          <ModalBody>
              <Form onSubmit={onSubmit}>
                  <FormGroup row>
                      <Col lg={6} className="offset-lg-3">
                          <Input 
                              type="text" 
                              className="modal-field"
                              placeholder={'Name'} 
                              value={studentName} 
                              onChange={(e) => setName(e.target.value)}
                          />
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Col lg={6} className="offset-lg-3">
                          <Input 
                              type="text" 
                              className="modal-field" 
                              placeholder={'Admission No.'}
                              value={admissionNo} 
                              onChange={(e) => setAdmissionNo(e.target.value)}
                          />
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Col lg={6} className="offset-lg-3">
                          <Input 
                              type="text" 
                              className="modal-field" 
                              placeholder={'Student Class'}
                              value={studentClass} 
                              onChange={(e) => setClass(e.target.value)}
                          />
                      </Col>
                  </FormGroup>
                  <button className="btn-group save">Save</button>
                  <button className="btn-group cancel mr-2" onClick={toggleModal}>Cancel</button>
              </Form>           
          </ModalBody>
      </Modal>
    );
  
}

export default StudentModal;