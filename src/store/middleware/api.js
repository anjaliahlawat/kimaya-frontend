import axios from 'axios'
import * as actions from '../api'
import { toastify } from '../../common-functions/notify'

const api = ({dispatch}) => next => async action => {
    if(action.type !== actions.apiCallBegan.type) return next(action)
    
    const {url, method, data, onStart, onSuccess, onError} = action.payload
    
    if(onStart) dispatch({type: onStart})

    next(action) // this is for dispatching apiCallBegan

    try{
        const response = await axios.request({
        baseURL: 'http://localhost:4000/api',
        url,
        method,
        data
      })
      
      //General
      dispatch(actions.apiCallSuccess(response.data))
      //specific
      if(onSuccess) dispatch({ type : onSuccess, payload: response.data })
    }
    catch(e){
        //general
        dispatch(actions.apiCallFailed(e.message))
        //specific
        if(onError) dispatch({ type: onError, payload: e.message})
        toastify('error', 'Error Occurred! Try again')
    }
}

export default api