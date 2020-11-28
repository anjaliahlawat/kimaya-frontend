import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan} from './api'
import moment from 'moment'

const slice = createSlice({
  name: 'studentProfile',
  initialState: {
    profileData: {},
    loading: false,
    lastFetch: null
  },
  reducers: {
      studentDataRequested: (studentProfile, action) => {
        studentProfile.loading = true
      },
      studentDataReceived: (studentProfile, action) => { 
          const {result, studentData} = action.payload
          console.log(studentData.studentDetails[0])
          if(result === 'success'){
              studentProfile.profileData = {...studentData}
              studentProfile.lastFetch = Date.now()
          }
          studentProfile.loading = false
      },
      studentDataRequestFailed: (studentProfile, action) => {
        studentProfile.loading = false
      },
      studentDataEdit : (studentProfile, action) => {
        const {result, studentData} = action.payload
        if(result === 'success'){
            studentProfile.profileData = {...studentData}
        }
     },
     feePaid : (studentProfile, action) => {
        const {result, studentData} = action.payload
        if(result === 'success'){
           studentProfile.profileData = {...studentData}
        }
     }
  }
})

export const { 
  studentDataRequested,
  studentDataReceived,
  studentDataRequestFailed,
  studentDataEdit,
  feePaid
} = slice.actions  

export default slice.reducer

//Action creators 
const url = '/student'

export const loadStudentData = (data) => apiCallBegan({
    url: url + '/student-data',
    method: 'post',
    data: {
        admissionNum: data
    },
    onStart:  studentDataRequested.type,
    onSuccess: studentDataReceived.type,
    onError: studentDataRequestFailed.type
})

export const payStudentFees = (data) => apiCallBegan({
  url: url + '/pay-fees',
  method: 'post',
  data: data,
  onSuccess: feePaid.type
})

export const getStudentData =createSelector(
  state => state.entities.studentProfile,
  studentProfile => studentProfile.profileData
);