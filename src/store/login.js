import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan} from './api'
import { setUser, clearOut } from "../services/authService";

const slice = createSlice({
  name: 'authentication',
  initialState: {
    user: {},
    loggingIn: false,
    loggedIn: false
  },
  reducers: {
    login_request: (authentication, action) => {
         authentication.loggingIn = true
         authentication.user= action.payload
    },
    login_success: (authentication, action) => {
        const {result, user} = action.payload
        if(result === 'success'){
          authentication.loggedIn = true
          authentication.user= user
          setUser(user)
          window.location = '/home'
        }
        else{
          authentication.loggedIn = false
          authentication.user= {}
        }
    },
    login_failed : (authentication, action) => {
        authentication.loggingIn = false
        authentication.loggedIn = false
        authentication.user= {}
    },
    logout : (authentication, action)=> {
        clearOut()
        window.location = '/login'
    }
  }
})

export const { 
  login_request,
  login_success, 
  login_failed,
  logout
} = slice.actions  

export default slice.reducer

const url = '/auth'

export const login = user => apiCallBegan({
    url: url,
    method: 'post',
    data: user,
    onStart: login_request.type,
    onSuccess: login_success.type,
    onError: login_failed.type
})
