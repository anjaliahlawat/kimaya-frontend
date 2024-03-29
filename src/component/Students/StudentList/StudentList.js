import React, { useEffect, useState } from 'react';
import SearchBox from "../../common/SearchBox";
import Pagination from '../../common/Pagination';
import StudentModal from './StudentModal';
import { paginate } from '../../../common-functions/paginate';
import { useDispatch, useSelector } from 'react-redux';
import { loadStudents, getAllStudents, isLoading, gotError } from '../../../store/studentList';
import { Link } from 'react-router-dom';
import Header from '../../common/Header';
import Calender from '../../common/Calender';
import Loading from '../../common/Loading';

const months = require('../../../assets/months.json')

function StudentList(props){
  const limit = 100
  let students = useSelector(getAllStudents)
  const [searchedValue, setSearchedValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setModal] = useState(false)
  const [month, setMonth] = useState(months[(new Date()).getMonth()].name)
  const [year, setYear] = useState(new Date().getFullYear())
  const dispatch = useDispatch()
  let loading = useSelector(isLoading)
  let error = useSelector(gotError)

  useEffect(() => {
    console.log(students)
    dispatch(loadStudents(month))
  }, [month, year, students])

  const toggleModal = () => {
    setModal(!isModalOpen)
  }

  const getPagedData = () => {
    let filtered = []
    console.log(searchedValue)
    if(searchedValue){
        filtered = students.filter(item => item['name'].toLowerCase().includes(searchedValue.toLowerCase()) ||  item['admissionNum'].toLowerCase().includes(searchedValue.toLowerCase()))  
        console.log(filtered)     
    }
    else
        filtered = [...students]

    const arr = paginate(filtered, currentPage, limit)
    return { totalCount: filtered.length, data: arr }
  }

  const handleSearch = (e) => {
      const {value} = e.target
      setSearchedValue(value)
  }

  const changePage = (pageNo) => {
    setCurrentPage(pageNo)
  }

  const onYearChange = async (type) => {
      if(type === 'left'){
          setYear(year - 1)
      }
      else
          setYear(year + 1)
      await dispatch(loadStudents(month))
  }

  const onMonthSelect = async (month) => {
    setMonth(month)
    await dispatch(loadStudents(month))
  }

  const { totalCount, data : arr} = getPagedData()

  if(loading)
    return(<Loading message={'Loading students'}/>)

  if(error)
    return (<h5>Server Error</h5>)

  return (
    <div className="container-fluid student-list">
        <button className="add-student" type="button" onClick={toggleModal}>
            + Add Student
        </button>
        <Header title={"Student List"} />
        <div className="row body-row1">
            <div className="col-6 col-md-4 col-lg-6">
                <SearchBox 
                    value={searchedValue}
                    handleSearch={handleSearch}
                />                
            </div>
            <div className="col-6 col-md-4 col-lg-2 offset-2">               
                <Calender 
                    month={month} 
                    year={year} 
                    onYearChange={onYearChange} 
                    onMonthSelect={onMonthSelect}
                />
            </div>
            <div className="col-6 col-md-4 col-lg-2">
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
                    <div className="d-flex student-header">
                          <div className="p-2">Sr. No</div>
                          <div className="p-2">Student</div>
                          <div className="p-2">Admission No.</div>
                          <div className="p-2">Class</div>
                          <div className="p-2">Parent/Guardian</div>
                          <div className="p-2">Fee Status</div>
                      </div>
                      {arr.map((student, key) => {
                         return(
                            <Link to={`/students/${student.admissionNum}`} params={{ uin: student.admissionNum }} key={key}>
                                <div className="d-flex student-rows">
                                    <div className="p-2">{key + 1}</div>
                                    <div className="p-2">{student.name}</div>
                                    <div className="p-2">{student.admissionNum}</div>
                                    <div className="p-2">{student.class}</div>
                                    <div className="p-2">{student.parent.name}</div>
                                    <div className={`p-2 ${student.status}`}>
                                        <div>{student.status}</div>
                                    </div>
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
            srNo={students.length+1}
        />
    </div>
  );
}

export default StudentList;