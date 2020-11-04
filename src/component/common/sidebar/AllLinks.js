import React from 'react';
import CustomLink from './CustomLink';

const AllLinks =({ activeClass, linkName }) => {
  return (
    <div className="navlinks">
      <ul className="list-unstyled links">
          <CustomLink 
              linkName ={linkName}
              givenLink ={'students'}
              title={'Student List'}
          />
          <CustomLink 
              linkName ={linkName}
              givenLink ={'settings'}
              title={'School Settings'}
          />
          <CustomLink 
              linkName ={linkName}
              givenLink ={'account'}
              title={'Account'}
          />
      </ul>
    </div>
  );
}

export default AllLinks;