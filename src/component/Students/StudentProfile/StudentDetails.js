import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import StudentEditForm from './Forms/StudentEditForm';
import ParentEditForm from './Forms/ParentEditForm';
import { editStudentData } from '../../../store/studentProfile';

function StudentDetails({data, parentDetails}) {
  const [studentData, setStudentData] = useState({})
  const [parentData, setParentData] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    setStudentObj(data)
    setParentObj(parentDetails)
  }, [data, parentDetails])

  const setStudentObj = (obj) => {
    const studentObj = {
      _id: obj._id,
      name: obj.name,
      class: obj.class,
      month: obj.month,
      admissionDate: obj.admissionDate
    }
    setStudentData(studentObj)
  }

  const setParentObj = (obj) => {
    const parentObj = {
      _id: obj._id,
      name: obj.name,
      email: obj.email,
      contactNum: obj.contactNum,
      address: obj.address
    }
    setParentData(parentObj)
  }

  const handleDataChange = (data, type) => {
    const {name, value} = data
    if(type === "student") {
      const temp = {...studentData}
      temp[name] = value
      setStudentData(temp)
    }
    else {
      const temp = {...parentData}
      temp[name] = value
      setParentData(temp)
    }
  }

  const saveData = async () => {
    const formData = {
      studentDetails : studentData,
      parentDetails : parentData,
    }
    await dispatch(editStudentData(formData))
  }

  return (
    <div className="container-fluid student-details">
        <button className="student-details_save-btn" onClick={saveData}>Save</button>
        <div className="row student-details_row1">
            <div className="col-12">
                <h5>Student Info.</h5>
              <StudentEditForm 
                data={studentData} 
                handleDataChange={handleDataChange}
              />
            </div>
        </div>
        <div className="row student-details_row2">
            <div className="col-12">
                <h5>Parent Info.</h5>
                <ParentEditForm 
                  data={parentData} 
                  handleDataChange={handleDataChange}
                />
            </div>
        </div>
    </div>
  );
}

export default StudentDetails;