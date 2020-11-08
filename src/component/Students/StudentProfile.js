import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import StudentBody from './StudentBody';

function StudentProfile({uin, notify}) {
  const [studentData, setStudentData] = useState({})
  
  useEffect(()=> {

  }, [uin])

  return (
    <div className="container-fluid student-profile">
        <Header title={`Students | ${uin}`} />
        <StudentBody data={studentData}/>
    </div>
  );
}

export default StudentProfile;