import React from 'react'
import StudentList from './Students/StudentList'
import StudentProfile from './Students/StudentProfile'
import Settings from './Settings/Settings'

function RenderedComponent({module, folder, notify}) {
  if(module === 'student'){
      if(folder === undefined)
          return ( <StudentList folder={folder} notify={notify}/> )
      else
          return ( <StudentProfile folder={folder} notify={notify}/> )
  }
  else if(module === 'settings')
    return (<Settings notify={notify} /> )
  else
      window.location = '/list'
}

export default RenderedComponent;