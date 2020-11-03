import {toast } from 'react-toastify';

export function toastify(type, msg){
  toast[type](msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}