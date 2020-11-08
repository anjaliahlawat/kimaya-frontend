import React from 'react';

function Header({title}) {
  return (
    <div className="row body-header">
        <h5>{title}</h5>
    </div>
  );
}

export default Header;