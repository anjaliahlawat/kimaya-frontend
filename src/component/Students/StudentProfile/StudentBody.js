import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import FeePayments from './FeePayments';
import StudentDetails from './StudentDetails';

function StudentBody({data, admissionNum}) {
  const [studentData, setStudentData] = useState({})
  const [key, setKey] = useState('studentDetails')

  useEffect(() => {
    setStudentData({...data})
  }, [data])

  if(Object.keys(studentData).length === 0)
    return null
  return (
        <Tabs id="student-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey="studentDetails" title="Student Details">
                <StudentDetails 
                    data={studentData.studentDetails} 
                    parentDetails={studentData.parentDetails} 
                    admissionNum={admissionNum}
                />
            </Tab>
            <Tab eventKey="feePayments" title="Fee Payments">
                <FeePayments 
                    data={studentData.feePayments} 
                    admissionNum={admissionNum}
                    studentData={studentData.studentDetails}
                    parentData={studentData.parentDetails}
                />
            </Tab>
        </Tabs>
  );
}

export default StudentBody;