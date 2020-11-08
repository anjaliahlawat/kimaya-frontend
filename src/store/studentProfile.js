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
          studentProfile.profileData = action.payload
          studentProfile.loading = false
          studentProfile.lastFetch = Date.now()
      },
      studentDataRequestFailed: (studentProfile, action) => {
        studentProfile.loading = false
      },
      studentDataEdit : (studentProfile, action) => {
        const {result, data} = action.payload
        if(result === 'success'){
           
        }
     },
  }
})

export const { 
  studentDataRequested,
  studentDataReceived,
  studentDataRequestFailed,
  studentDataEdit
} = slice.actions  

export default slice.reducer

//Action creators 
const url = '/student'

export const loadStudentData = (data) => (dispatch, getState) => {
  const { lastFetch } = getState().entities.studentProfile
  
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')

  if(diffInMinutes < 10) return

  return dispatch(
     apiCallBegan({
        url: url + '/student-data',
        method: 'post',
        data: {
           admissionNum: data
        },
        onStart:  studentDataRequested.type,
        onSuccess: studentDataReceived.type,
        onError: studentDataRequestFailed.type
     })
  )
}

export const getStudentData =createSelector(
  state => state.entities.studentProfile,
  studentProfile => studentProfile.profileData
);