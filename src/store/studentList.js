import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan} from './api'
import moment from 'moment'
import { toastify } from "../common-functions/notify";

const slice = createSlice({
  name: 'studentLists',
  initialState: {
     list: [],
     loading: true,
     error: false,
     lastFetch: null
  },
  reducers: {
     studentsRequested: (studentLists, action) => {
        studentLists.loading = true
     },
     studentsReceived: (studentLists, action) => {
        studentLists.list = action.payload
        studentLists.loading = false
        studentLists.error = false
        studentLists.lastFetch = Date.now()
     },
     studentsRequestFailed: (studentLists, action) => {
        studentLists.loading = false
        studentLists.error = true
     },
     studentAdded : (studentLists, action) => {
        studentLists.loading = false
        const {result, data} = action.payload
        if(result === 'success'){
           studentLists.error = false
           studentLists.list = [...data]
        }
        else{
            studentLists.error = true
            toastify('error', action.payload.msg)
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

export const addStudent = (students, month) => apiCallBegan({
  url: url + '/add-student',
  method: 'post',
  data: {students: students, month : month},
  onSuccess: studentAdded.type
})

export const getAllStudents =createSelector(
   state => state.entities.studentLists,
   studentLists => studentLists.list
 );

 export const isLoading =createSelector(
   state => state.entities.studentLists,
   studentLists => studentLists.loading
 );
 
 export const gotError =createSelector(
   state => state.entities.studentLists,
   studentLists => studentLists.error
 );