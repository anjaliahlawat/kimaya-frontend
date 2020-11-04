import React from 'react';
import { Image, Button } from 'react-bootstrap';
import AllLinks from './AllLinks';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/login';
import logo from "../../../assets/logo.PNG";

const Sidebar =({linkName}) => {
  const dispatch = useDispatch()
  return (
    <nav className="sidebar">
        <div className="sidebar-header">
            <Image src={logo} />
        </div>
        <AllLinks linkName={linkName}/>
        <Button className="logout-btn" onClick={() =>dispatch({type: logout.type})}>Logout</Button>
    </nav>
  );
}

export default Sidebar;