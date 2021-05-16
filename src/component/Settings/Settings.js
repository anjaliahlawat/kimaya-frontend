import React, { useEffect, useState } from 'react';
import { Form, Input, FormGroup, Col, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loadSettings, getSettings, editSettings } from '../../store/settings';

function Settings(props) {
  const [schoolName, setSchoolName] = useState('')
  const [email, setEmail] = useState('')
  const [contactNum, setContactNum] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const dispatch = useDispatch()
  const storeData = useSelector(getSettings)

  useEffect(()=> {
    dispatch(loadSettings())
    if( storeData && Object.keys(storeData).length >0){
        setSchoolName(storeData.name)
        setAddress(storeData.address)
        setContactNum(storeData.contactNum)
        setPincode(storeData.pincode)
        setEmail(storeData.email)
    }
  }, [storeData])

  const onSubmit = async (e) => {
     e.preventDefault()
      const formData = {
         'schoolName' : schoolName,
         'address' : address,
         'pincode' : pincode,
         'contactNum' : contactNum,
         'email' : email,
      }
      await dispatch(editSettings(formData))
  }

  return (
    <div className="container-fluid settings">
       <Form className="settings-form" onSubmit={onSubmit}>
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
                      value={contactNum} 
                      onChange={(e) => setContactNum(e.target.value)}
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
       
          <button className="btn-group save">Save</button>
       </Form>
    </div>
  );
}

export default Settings;