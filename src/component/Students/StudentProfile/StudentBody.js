import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import FeePayments from './FeePayments';
import StudentDetails from './StudentDetails';

function StudentBody({data}) {
  const [key, setKey] = useState('studentDetails')

  return (
        <Tabs id="student-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey="studentDetails" title="Student Details">
                <StudentDetails data={data.studentDetails} parentData={data.parentDetails} />
            </Tab>
            <Tab eventKey="feePayments" title="Fee Payments">
                <FeePayments data={data.feePayments}/>
            </Tab>
        </Tabs>
  );
}

export default StudentBody;