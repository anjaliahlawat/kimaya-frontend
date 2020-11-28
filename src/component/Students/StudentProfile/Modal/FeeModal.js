import React, { useEffect, useState} from 'react';
import { Form, Modal, ModalHeader, ModalBody, Col, Row, Input } from "reactstrap";
import Select from '../../../common/Select';
import InputBox from './FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { payStudentFees } from '../../../../store/studentProfile';
import { generatePdf } from '../../../../common-functions/generatePdf';
import { getSettings, loadSettings } from '../../../../store/settings';

const months = require('../../../../assets/months.json')

function FeeModal({isModalOpen, toggleModal, currMonth, admissionNum}){
  const [date, setDate] = useState()
  const [modeOfPayment, setModeOfPayment] = useState('Online')
  const [totalFee, setTotalFee] = useState()
  const [registrationFee, setRegistrationFee] = useState()
  const [admissionFee, setAdmissionFee] = useState()
  const [developmentCharges, setDevelopmentCharges] = useState()
  const [annualCharges, setAnnualCharges] = useState()
  const [tuitionFee, setTuitionFee] = useState()
  const [activityCharges, setActivityCharges] = useState()
  const [meal, setMeal] = useState()
  const [transport, setTransport] = useState()
  const [misc, setMisc] = useState()
  const [uniform, setUniform] = useState()
  const [bookNbag, setBookNbag] = useState()
  const [dayCare, setDayCare] = useState()
  const dispatch = useDispatch()
  const storeData = useSelector(getSettings)

  const modeArr = [
      {
          _id : 1,
          name : 'Online',
      },
      {
        _id : 2,
        name : 'Cash',
      },
      {
        _id : 3,
        name : 'Cheque',
     }
  ]

  useEffect(() => {
    dispatch(loadSettings())
  }, [])

  const onSubmit = async (e)=> {
    e.preventDefault()
    const totalFee = calculateFee()
    setTotalFee(totalFee)
    const feeDetails = {
        registrationFee : registrationFee,
        admissionFee : admissionFee,
        developmentCharges : developmentCharges,
        annualCharges : annualCharges,
        activityCharges : activityCharges,
        tuitionFee : tuitionFee,
        meal : meal,
        transport : transport,
        misc : misc,
        uniform : uniform,
        bookNbag : bookNbag,
        dayCare : dayCare,
    }
    if(isValid()){
        const formData = {
            "modeOfPayment" : modeOfPayment,
            "date" : date,
            "admissionNum" : admissionNum,
            "month" : months[currMonth].name,
            "totalFees" : totalFee,
            "feeDetails" : feeDetails,
        }
        await dispatch(payStudentFees(formData))
        let pdfData = {...formData, ...feeDetails}
        delete pdfData['date']
        pdfData['paymentDate'] = date
        generatePdf(pdfData, storeData)
    }
    toggleModal()
  }

  const isValid = () => {
      if(modeOfPayment !== '' && date !== '' && totalFee !== 0)
         return true
      return false
  }

  const calculateFee = () => {
      let sum = checkValue(registrationFee) + checkValue(admissionFee) + checkValue(developmentCharges) + checkValue(annualCharges) + checkValue(tuitionFee) + checkValue(activityCharges) + checkValue(meal) + checkValue(transport) + checkValue(misc) + checkValue(uniform) + checkValue(bookNbag) + checkValue(dayCare)
      return sum
  }

  const checkValue = (val) => {
    if(!val)
        return 0
    return parseFloat(val)
  }

  return (
    <Modal className="student-modal" isOpen={isModalOpen} toggle={toggleModal} 
        size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalHeader>
            Fee Payment
            <span className="month">{months[currMonth].name}</span>    
        </ModalHeader>
        <ModalBody>
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col lg={2}>Date</Col>
                    <Col lg={5}><Input type="date" value={date} onChange={e=>setDate(e.target.value)}/></Col>
                </Row>
                <Row>
                    <Col lg={5}>
                        <InputBox name='registrationFee' value={registrationFee} onChange={setRegistrationFee} label={'Registration Fee'}/>
                        <InputBox name='admissionFee' value={admissionFee} onChange={setAdmissionFee}
                        label={'Admission Fee'} />
                        <InputBox name='developmentCharges' value={developmentCharges} onChange={setDevelopmentCharges} label={'Development Charges'}/>
                        <InputBox name='annualCharges' value={annualCharges} onChange={setAnnualCharges} label={'Annual Charges'}/>
                        <InputBox name='tuitionFee' value={tuitionFee} onChange={setTuitionFee} label={'Tuition Fee'} />
                        <InputBox name='activityCharges' value={activityCharges} onChange={setActivityCharges} label={'Activity Charges'}/>
                    </Col>
                    <Col lg={5}>
                        <InputBox name='meal' value={meal} onChange={setMeal} label={'Meal'}/>
                        <InputBox name='transport' value={transport} onChange={setTransport} label={'Transport'}/>
                        <InputBox name='misc' value={misc} onChange={setMisc} label={'Misc'}/>
                        <InputBox name='uniform' value={uniform} onChange={setUniform} label={'Uniform'}/>
                        <InputBox name='bookNbag' value={bookNbag} onChange={setBookNbag} label={'Books & Bag'}/>
                        <InputBox name='dayCare' value={dayCare} onChange={setDayCare} label={'Day Care'}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        Mode of Payment
                    </Col>
                    <Col lg={4}>
                        <Select 
                            name={'modeOfPayment'} 
                            label={""} 
                            options={modeArr}
                            onChange={(e) => setModeOfPayment(modeArr[e.target.value-1].name)}
                        />

                    </Col>
                </Row>
                <button className="btn-group save">Save</button>
                <button className="btn-group cancel mr-2" onClick={toggleModal}>Cancel</button>
            </Form>           
        </ModalBody>
    </Modal>
  );
}

export default FeeModal;