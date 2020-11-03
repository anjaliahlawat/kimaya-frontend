import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan} from './api'
import { setUser } from "../services/authService";

const slice = createSlice({
  name: 'register',
  initialState: {
    user: {},
    registering: false
  },
  reducers: {
    register_request: (register, action) => {
      register.registering = true
    },
    register_success: (register, action) => {
      const {result, user} = action.payload
        if(result === 'success'){
          register.registering = ''
          register.user= user
          setUser(user)          
          window.location = '/home'
        }
        else{
          register.registering = false
          register.user= {}
        }
    },
    register_failed : (register, action) => {
        register.registering = false
        register.user= {}
    }
  }
})

export const { 
  register_request,
  register_success, 
  register_failed
} = slice.actions  

export default slice.reducer

const url = '/register'

export const register = user => apiCallBegan({
  url: url,
  method: 'post',
  data: user,
  onStart: register_request.type,
  onSuccess: register_success.type,
  onError: register_failed.type
})