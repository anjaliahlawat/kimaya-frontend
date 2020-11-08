import React from 'react'
import StudentList from './Students/StudentList'
import StudentProfile from './Students/StudentProfile'
import Settings from './Settings/Settings'

function RenderedComponent({module, uin, notify}) {
  console.log(uin)
  if(module === 'students'){
      if(uin === undefined)
          return ( <StudentList notify={notify}/> )
      else
          return ( <StudentProfile uin={uin} notify={notify}/> )
  }
  else if(module === 'settings')
    return (<Settings notify={notify} /> )
  else
      window.location = '/students'
}

export default RenderedComponent;