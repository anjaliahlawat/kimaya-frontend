import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentData, loadStudentData } from '../../../store/studentProfile';
import Header from '../../common/Header';
import StudentBody from './StudentBody';

function StudentProfile({uin, notify}) {
  const studentData = useSelector(getStudentData)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(loadStudentData(uin))
    console.log(studentData)
  }, [studentData])

  if(!studentData)
      return null
  return (
    <div className="container-fluid student-profile">
        <Header title={`Students | ${uin}`} />
        <StudentBody data={studentData} admissionNum={uin}/>
    </div>
  );
}

export default StudentProfile;