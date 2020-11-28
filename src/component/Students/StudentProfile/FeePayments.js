import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePdf } from '../../../common-functions/generatePdf';
import { getSettings, loadSettings } from '../../../store/settings';
import FeeModal from './Modal/FeeModal';

function FeePayments({data, admissionNum}){
  const currMonth = new Date().getMonth()
  const currYear = new Date().getFullYear()
  const [isModalOpen, setModal] = useState(false)
  const dispatch = useDispatch()
  const storeData = useSelector(getSettings)

  useEffect(()=> {
    dispatch(loadSettings())
  }, [])

  const isFeePending =() => {
    if(data.length > 0){
      for(let i=0; i< data.length; i++){
          let d1 = new Date(data[i].paymentDate)
           if(currMonth === d1.getMonth() && currYear === d1.getFullYear())
              return false
       }
       return true
    }
    return true
  }

  const toggleModal = () => {
      setModal(!isModalOpen)
  }

  const setDate = (val) => {
     let d1 = new Date(val.paymentDate)
     return val.month +" "+ d1.getDate() + ", " + d1.getFullYear()
  }

  return (
    <div className="container-fluid fee-payments">
        {isFeePending() && 
            <div className="row row1">
                This month's fee is pending: <button onClick={toggleModal}>Pay</button>
            </div>
        }
        <div className="row row2">
            <h5>List of previous payments</h5>
            <div className="col-12 d-flex row2_data header">
                <div className="p-2">Reference No.</div>
                <div className="p-2">Total Fees</div>
                <div className="p-2">Date</div>
                <div className="p-2">Mode of Payment</div>
                <div className="p-2">Status</div>
                <div className="p-2 last"></div>
            </div>
            {data.length > 0 && data.map((item, key)=> {
               return(
                 <div className="col-12 d-flex row2_data" key={key}>
                    <div className="p-2">{item.referenceNo}</div>
                    <div className="p-2">₹{item.totalFees}</div>
                    <div className="p-2">{setDate(item)}</div>
                    <div className="p-2">{item.modeOfPayment}</div>
                    <div className="p-2">{item.status}</div>
                    <div className="p-2 last" onClick={() =>generatePdf(item, storeData)}>Generate Receipt</div>
                 </div>
               )
            })}
        </div>
        <FeeModal 
            isModalOpen={isModalOpen} 
            toggleModal={toggleModal}
            currMonth={currMonth}
            admissionNum={admissionNum}
        />
    </div>
  );
}

export default FeePayments;