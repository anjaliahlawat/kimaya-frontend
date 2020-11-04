import React from 'react';

function SearchBox({value, handleSearch}){
  return (
      <div className="search-variant form-group has-search">
          <span className="fa fa-search form-control-feedback"></span>
          <input 
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