import React, { useEffect, useState } from 'react';
import SearchBox from "../common/SearchBox";
import Pagination from '../common/Pagination';
import StudentModal from './StudentModal';
import { paginate } from '../../common-functions/paginate';

function StudentList(props) {
  const limit = 20

  const [students, setStudents] = useState([])
  const [searchedValue, setSearchedValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setModal] = useState(false)

  useEffect(() => {

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
        <div className="row top-row">
            <h5>Student List</h5>
        </div>
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
                arr.map((student, key) => {
                   return(
                      <div>
                          <div>{key + 1}</div>
                          <div>{student.name}</div>
                          <div>{student.admissionNo}</div>
                          <div>{student.class}</div>
                      </div>
                   )
                })
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