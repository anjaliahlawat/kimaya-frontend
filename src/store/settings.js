import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan} from './api'
import moment from 'moment'

const slice = createSlice({
  name: 'settings',
  initialState: {
     data: {},
     loading: false,
     lastFetch: null
  },
  reducers: {
     settingsRequested: (settings, action) => {
        settings.loading = true
     },
     settingsReceived: (settings, action) => {
        const {result, data} = action.payload
        // console.log(data)
        if(result === 'success'){
          settings.data = data
          settings.loading = false
          settings.lastFetch = Date.now()
        }
     },
     settingsRequestFailed: (settings, action) => {
        settings.loading = false
     },
     settingsEdited : (settings, action) => {
        const {result, data} = action.payload
        if(result === 'success'){
            console.log(data)
            settings.data ={...data}
        }
     }
  }
})

export const { 
  settingsEdited,
  settingsDeleted, 
  settingsReceived,
  settingsRequested,
  settingsRequestFailed
} = slice.actions  

export default slice.reducer

//Action creators 
const url = '/settings'

export const loadSettings = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.settings
   
   const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')

   if(diffInMinutes < 10) return
  return dispatch(
     apiCallBegan({
        url: url,
        method: 'post',
        data: {},
        onStart:  settingsRequested.type,
        onSuccess: settingsReceived.type,
        onError: settingsRequestFailed.type
     })
  )
}

export const getSettings =createSelector(
  state => state.entities.settings,
  settings => settings.data
);

export const editSettings = settingsData => apiCallBegan({
  url: url + '/edit-settings',
  method: 'post',
  data: settingsData,
  onSuccess: settingsEdited.type
})