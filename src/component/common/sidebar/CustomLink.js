import React from 'react';
import { Link } from 'react-router-dom';
// import { Image } from 'react-bootstrap';

const CustomLink =({linkName, givenLink, title, source, sublink})=> {
  return (
    <li className={linkName === givenLink ? "active" : ""}>
          <Link to={`/${givenLink}/${sublink ? sublink : ''}`} params={{folder: sublink? sublink : null}} className='sidebar-a'>
            {/* <Image src={require(source)} thumbnail /> */}
            <span>{title}</span>
          </Link>
        </li>
  );
}

export default CustomLink;