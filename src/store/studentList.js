import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan} from './api'
import moment from 'moment'

const slice = createSlice({
  name: 'studentLists',
  initialState: {
     list: [],
     loading: false,
     lastFetch: null
  },
  reducers: {
     studentsRequested: (studentLists, action) => {
        studentLists.loading = true
     },
     studentsReceived: (studentLists, action) => {
      //   console.log(action.payload)
        studentLists.list = action.payload
        studentLists.loading = false
        studentLists.lastFetch = Date.now()
     },
     studentsRequestFailed: (studentLists, action) => {
        studentLists.loading = false
     },
     studentAdded : (studentLists, action) => {
        const {result, data} = action.payload
        if(result === 'success'){
           studentLists.list = [...studentLists.list,{ ...data}]
           window.location='/students'
        }
     },
     studentsDeleted : (studentLists, action) => {
        const task = action.payload
        studentLists.list.splice(studentLists.list.indexOf(task), 1)
     }
  }
})

export const { 
  studentAdded,
  studentDeleted, 
  studentsReceived,
  studentsRequested,
  studentsRequestFailed
} = slice.actions  

export default slice.reducer

//Action creators 
const url = '/student'

export const loadStudents = (data) => (dispatch, getState) => {
  const { lastFetch } = getState().entities.studentLists
  
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')

  if(diffInMinutes < 10) return

  return dispatch(
     apiCallBegan({
        url: url + '/student-list',
        method: 'post',
        data: {
           month: data
        },
        onStart:  studentsRequested.type,
        onSuccess: studentsReceived.type,
        onError: studentsRequestFailed.type
     })
  )
}

export const addStudent = students => apiCallBegan({
  url: url + '/add-student',
  method: 'post',
  data: {students: students},
  onSuccess: studentAdded.type
})

// export const deleteTask = task => apiCallBegan({
//   url: url + '/delete',
//   method: 'post',
//   data: {task_id : task._id},
//   onSuccess: taskDeleted.type
// })

export const getAllStudents =createSelector(
   state => state.entities.studentLists,
   studentLists => studentLists.list
 );