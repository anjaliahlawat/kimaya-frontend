import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan} from './api'
import { setUser } from "../services/authService";

const slice = createSlice({
  name: 'register',
  initialState: {
    user: {},
    loading: false,
    error : false
  },
  reducers: {
    register_request: (register, action) => {
      register.loading = true
    },
    register_success: (register, action) => {
      const {result, user} = action.payload
        if(result === 'success'){
          register.loading = false
          register.user= user
          setUser(user)          
          window.location = '/students'
        }
        else{
          register.loading = false
          register.error = true
          register.user= {}
        }
    },
    register_failed : (register, action) => {
        register.loading = false
        register.error = true
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

export const isLoading =createSelector(
  state => state.entities.register,
  register => register.loading
);

export const gotError =createSelector(
  state => state.entities.register,
  register => register.error
);