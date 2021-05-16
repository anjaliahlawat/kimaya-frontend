import {
  createSelector,
  createSlice
} from "@reduxjs/toolkit";
import {
  apiCallBegan
} from './api'
import moment from 'moment'
import { toastify } from "../common-functions/notify";

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
      if (result === 'success') {
        studentProfile.profileData = {...studentData}
        studentProfile.lastFetch = Date.now()
      }
      studentProfile.loading = false
    },
    studentDataRequestFailed: (studentProfile, action) => {
      studentProfile.loading = false
    },
    studentDataEdit: (studentProfile, action) => {
      const {
        result,
        studentData
      } = action.payload
      if (result === 'success') {
        // studentProfile.profileData = {
        //   ...studentData
        // }
        toastify("success", "Data updated!")
      }
    },
    feePaid: (studentProfile, action) => {
      const {result, studentData} = action.payload
      if (result === 'success') {
        studentProfile.profileData = {...studentData}
        toastify("success", "Fee paid", "You can check the downloaded fee receipt.")
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
  onStart: studentDataRequested.type,
  onSuccess: studentDataReceived.type,
  onError: studentDataRequestFailed.type
})

export const payStudentFees = (data) => apiCallBegan({
  url: url + '/pay-fees',
  method: 'post',
  data: data,
  onSuccess: feePaid.type
})

export const editStudentData = studentData => apiCallBegan({
  url: url + '/edit-student-data',
  method: 'post',
  data: studentData,
  onSuccess: studentDataEdit.type
})

export const getStudentData = createSelector(
  state => state.entities.studentProfile,
  studentProfile => studentProfile.profileData
)
