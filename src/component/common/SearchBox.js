import React from 'react';
import { Input } from 'reactstrap';

function SearchBox({value, handleSearch}){
  console.log(value)
  return (
      <div className="search-variant form-group has-search">
          <span className="fa fa-search form-control-feedback"></span>
          <Input 
              className="form-control searchbar" 
              type="text" 
              placeholder="Search" 
              name="searchedValue" 
              value={value} 
              aria-label="Search" 
              onChange={(e) => handleSearch(e)}
          />
      </div>
  );
}

export default SearchBox;