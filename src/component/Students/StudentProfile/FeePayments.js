import React, { useState } from 'react';
import FeeModal from './Modal/FeeModal';

function FeePayments({data, admissionNum}){
  const currMonth = new Date().getMonth()
  const [isModalOpen, setModal] = useState(false)

  const isFeePending =() => {
    if(data.length > 0){
       
    }
    return true
  }

  const toggleModal = (e) => {
    e.preventDefault()
    setModal(!isModalOpen)
  }

  return (
    <div className="container-fluid fee-payments">
        {isFeePending() && 
            <div className="row row1">
                This month's fee is pending: <button onClick={toggleModal}>Pay</button>
            </div>
        }
        <div className="row row2">
            
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