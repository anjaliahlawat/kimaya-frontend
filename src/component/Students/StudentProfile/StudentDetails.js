import React from 'react';
import StudentEditForm from './Forms/StudentEditForm';
import ParentEditForm from './Forms/ParentEditForm';

function StudentDetails({data, parentData, onEdit}) {
  return (
    <div className="container-fluid student-details">
        <div className="row student-details_row1">
            <div className="col-12">
                <h5>Student Info.</h5>
              <StudentEditForm data={data}/>
            </div>
        </div>
        <div className="row student-details_row2">
            <div className="col-12">
                <h5>Parent Info.</h5>
                <ParentEditForm data={parentData} onEdit={onEdit}/>
            </div>
        </div>
    </div>
  );
}

export default StudentDetails;