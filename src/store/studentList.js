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
           studentLists.list = [...studentLists.list, ...data]
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

export const loadStudents = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.studentLists
  
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')

  if(diffInMinutes < 10) return

  return dispatch(
     apiCallBegan({
        url: url + '/students-list',
        method: 'post',
        data: {
         //   user: getUser().userEmail
        },
        onStart:  studentsRequested.type,
        onSuccess: studentsReceived.type,
        onError: studentsRequestFailed.type
     })
  )
}

// export const addTask = tasks => apiCallBegan({
//   url: url + '/create',
//   method: 'post',
//   data: {tasks: JSON.stringify(tasks), user: getUser().userEmail},
//   onSuccess: taskAdded.type
// })

// export const deleteTask = task => apiCallBegan({
//   url: url + '/delete',
//   method: 'post',
//   data: {task_id : task._id},
//   onSuccess: taskDeleted.type
// })

// export const getPersonalTasks =createSelector(
//    state => state.entities.capturedTasks,
//    capturedTasks => capturedTasks.list.filter(task => task.category === 'personal')
//  );