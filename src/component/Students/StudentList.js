import React, { useEffect, useState } from 'react';
import SearchBox from "../common/SearchBox";
import Pagination from '../common/Pagination';
import StudentModal from './StudentModal';
import { paginate } from '../../common-functions/paginate';
import { useDispatch, useSelector } from 'react-redux';
import { loadStudents, getAllStudents } from '../../store/studentList';
import { Link } from 'react-router-dom';
import Header from '../common/Header';

function StudentList(props) {
  const limit = 20

  let students = useSelector(getAllStudents)
  const [searchedValue, setSearchedValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setModal] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadStudents())
  }, [])

  const toggleModal = (e) => {
    e.preventDefault()
    setModal(!isModalOpen)
}

  const getPagedData = () => {
    let filtered = []
    if(searchedValue){
        filtered = students.filter(item => item['name'].toLowerCase().includes(searchedValue.toLowerCase()) ||  item['admissionNo'].toLowerCase().includes(searchedValue.toLowerCase()))       
    }
    else
        filtered = [...students]

    const arr = paginate(filtered, currentPage, limit)
    return { totalCount: filtered.length, data: arr }
  }

  const handleSearch = (e) => {
      const {value} = e.target.value
      setSearchedValue(value)
  }

  const changePage = (pageNo) => {
    setCurrentPage(pageNo)
  }

  const { totalCount, data : arr} = getPagedData()

  return (
    <div className="container-fluid student-list">
        <button className="add-student" type="button" onClick={toggleModal}>
            Add Student
        </button>
        <Header title={"Student List"} />
        <div className="row body-row1">
            <div className="col-6 col-md-4 col-lg-6">
                <SearchBox 
                    value={searchedValue}
                    handleSearch={handleSearch}
                />                
            </div>
            <div className="col-6 col-md-4 col-lg-6">
                <Pagination 
                  count={totalCount}
                  currentPage={currentPage}
                  pageSize={limit}
                  changePage={changePage}
                />
            </div>
        </div>
        <div className="row body-row2">
            {
                students.length === 0 ?
                <p>No students added.</p>
                :
                <React.Fragment>
                    <div className="d-flex justify-content-around student-header">
                          <div className="p-2">Sr. No</div>
                          <div className="p-2">Student</div>
                          <div className="p-2">Admission No.</div>
                          <div className="p-2">Class</div>
                      </div>
                      {arr.map((student, key) => {
                         return(
                            <Link to={`/students/${student.admissionNum}`} params={{ uin: student.admissionNum }}>
                                <div className="d-flex justify-content-around student-rows">
                                    <div className="p-2">{key + 1}</div>
                                    <div className="p-2">{student.name}</div>
                                    <div className="p-2">{student.admissionNum}</div>
                                    <div className="p-2">{student.class}</div>
                                </div>
                            </Link>
                            )
                      })}
                </React.Fragment>
            }
        </div>
        <StudentModal 
            isModalOpen={isModalOpen} 
            toggleModal={toggleModal}
        />
    </div>
  );
}

export default StudentList;