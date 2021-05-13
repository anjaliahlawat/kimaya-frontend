import React from 'react';
import {toast, Flip } from 'react-toastify';

import error from "../assets/error-img.png";
import active from "../assets/active-img.png";

const CustomToast = ({ toastProps, type, title, content }) => (
  <div>
      <h5>
        {type === 'error' ? <img src={error} alt="img"/> :  <img src={active} alt="img"/>}
        {title}
      </h5>
      <p>{content}</p>
  </div>
)

export function toastify(type, title, content){
  toast(<CustomToast type={type} title={title} content={content}/>, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      })
  }

