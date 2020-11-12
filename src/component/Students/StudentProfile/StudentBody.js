import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import FeePayments from './FeePayments';
import StudentDetails from './StudentDetails';

function StudentBody({data, admissionNum}) {
  const [key, setKey] = useState('studentDetails')
  
  if(Object.keys(data).length === 0)
    return null
  return (
        <Tabs id="student-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey="studentDetails" title="Student Details">
                <StudentDetails 
                    data={data.studentDetails} 
                    parentData={data.parentDetails} 
                    admissionNum={admissionNum}
                />
            </Tab>
            <Tab eventKey="feePayments" title="Fee Payments">
                <FeePayments data={data.feePayments} admissionNum={admissionNum}/>
            </Tab>
        </Tabs>
  );
}

export default StudentBody;