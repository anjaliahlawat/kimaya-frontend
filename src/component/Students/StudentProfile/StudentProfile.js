import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentData, loadStudentData } from '../../../store/studentProfile';
import Header from '../../common/Header';
import StudentBody from './StudentBody';

function StudentProfile({uin, notify}) {
  const studentData = useSelector(getStudentData)
  const dispatch = useDispatch()

  // console.log(studentData.studentDetails[0])

  useEffect(()=> {    
    dispatch(loadStudentData(uin))
  }, [])

  if(Object.keys(studentData).length === 0)
      return null
  return (
    <div className="container-fluid student-profile">
        <Header title={`Students | ${uin}`} />
        <StudentBody data={studentData} admissionNum={uin}/>
    </div>
  );
}

export default StudentProfile;