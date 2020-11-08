import React from 'react';
import EditForm from './Forms/Form';

function StudentDetails({data, parentData}) {
  return (
    <div className="container-fluid student-details">
        <div className="row student-details_row1">
            <h5>Student Info.</h5>
           <EditForm data={data}/>
        </div>
        <div className="row student-details_row2">
            <h5>Parent Info.</h5>
           <EditForm data={parentData}/>
        </div>
    </div>
  );
}

export default StudentDetails;