import React from 'react';
import EditForm from './Forms/Form';

function StudentDetails({data, parentData}) {
  console.log(data)
  return (
    <div className="container-fluid student-details">
        <div className="row student-details_row1">
            <div className="col-12">
                <h5>Student Info.</h5>
              <EditForm data={data}/>
            </div>
        </div>
        <div className="row student-details_row2">
            <div className="col-12">
                <h5>Parent Info.</h5>
                <EditForm data={parentData}/>
            </div>
        </div>
    </div>
  );
}

export default StudentDetails;