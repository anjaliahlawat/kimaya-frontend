import React from 'react';
import Sidebar from './common/sidebar/SideBar';
import RenderedComponent from './RenderedComponent';
import { ToastContainer} from 'react-toastify';
import { toastify } from '../common-functions/notify';

function Module(props) {
  const notify = (type, msg) => {
      toastify(type, msg)
  }

  return (
    <div className="wrapper">
       <Sidebar
          linkName={props.match.params.module}
        /> 
        <div className="content">
            <RenderedComponent  
              module={props.match.params.module}
              uin={props.match.params.uin}
              notify={notify}
            />
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    </div>
  );
}

export default Module;