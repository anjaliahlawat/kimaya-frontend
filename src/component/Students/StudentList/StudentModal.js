import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Modal, ModalHeader, ModalBody, Input, FormGroup, Col } from "reactstrap";
import Select from '../../common/Select'
import {addStudent} from '../../../store/studentList';

const months = require('../../../assets/months.json')

function StudentModal({isModalOpen, toggleModal}){
  const [studentName, setName] = useState('')
  const [admissionNo, setAdmissionNo] = useState('')
  const [studentClass, setClass] = useState('')
  const [month, setMonth] = useState('')
  const [parentName, setParentName] = useState('')
  const [email, setEmail] = useState('')
  const [contactNum, setContactNum] = useState(0)
  const [address, setAddress] = useState('')
  const dispatch = useDispatch()

  const onSubmit = async (event) => {
    event.preventDefault()
    if(isValid()){
        const formData = {
          "studentName" : studentName,
          "admissionNo" : admissionNo,
          "studentClass" : studentClass,
          "month" : month,
          "parentName" : parentName,
          "email" : email,
          "contactNum" : contactNum,
          "address" : address,
        }
        console.log(formData)
        await dispatch(addStudent(formData))
    }
  } 

  const isValid = () => {
     if(studentName && admissionNo && studentClass && month && parentName && email && contactNum && address){
         return true
     }
     return false
  }

  return (
    <Modal className="student-modal" isOpen={isModalOpen} toggle={toggleModal} 
        size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalHeader>
                New Student
        </ModalHeader>
        <ModalBody>
            <Form onSubmit={onSubmit}>
               <h5>Student Details</h5>
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
                <FormGroup row>
                    <Col lg={6} className="offset-lg-3">
                       <Select 
                          name={'month'} 
                          label={"Select Month"} 
                          options={months}
                          onChange={(e) => setMonth(months[e.target.value-1].name)}
                      />
                    </Col>
                </FormGroup>
                
                <h5>Parent Details</h5>
                <FormGroup row>
                    <Col lg={6} className="offset-lg-3">
                        <Input 
                            type="text" 
                            className="modal-field"
                            placeholder={'Parent/Guardian Name'} 
                            value={parentName} 
                            onChange={(e) => setParentName(e.target.value)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col lg={6} className="offset-lg-3">
                        <Input 
                            type="email" 
                            className="modal-field" 
                            placeholder={'Email ID'}
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col lg={6} className="offset-lg-3">
                        <Input 
                            type="number" 
                            className="modal-field" 
                            placeholder={'Contact Number'}
                            value={contactNum} 
                            onChange={(e) => setContactNum(e.target.value)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col lg={6} className="offset-lg-3">
                        <textarea
                            className="modal-field" 
                            placeholder={'Addess'}
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)}
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