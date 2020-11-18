import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import FeePayments from './FeePayments';
import StudentDetails from './StudentDetails';

function StudentBody({data, admissionNum, onEdit}) {
  const [studentData, setStudentData] = useState(data)
  const [key, setKey] = useState('studentDetails')

  // useEffect(() => {
  //   console.log(data)
  // }, [])

  const handleChange = (obj, index) => {
     let temp_obj = {...studentData}
     temp_obj['studentDetails'][index].value = obj.value
     setStudentData({...temp_obj})
  }

  if(Object.keys(data).length === 0)
    return null
  return (
        <Tabs id="student-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey="studentDetails" title="Student Details">
                <StudentDetails 
                    data={studentData.studentDetails} 
                    parentData={studentData.parentDetails} 
                    admissionNum={admissionNum}
                    onEdit={handleChange}
                />
            </Tab>
            <Tab eventKey="feePayments" title="Fee Payments">
                <FeePayments data={data.feePayments} admissionNum={admissionNum}/>
            </Tab>
        </Tabs>
  );
}

export default StudentBody;