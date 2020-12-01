import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

function Calender({month, year, onYearChange, onMonthSelect}) {
  const node = useRef();
  const [listShow, setListShow] = useState(false)
  const months = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const handleClickOutside=(event) =>{
    if (node.current && !node.current.contains(event.target)) {
        setListShow(false)
        }
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    return () => {
        document.removeEventListener("click", handleClickOutside)
    }
  }, [month, year])

  const openList = () => {
     setListShow(!listShow)
  }

  return (
    <div className="calender" ref={node}>
        <div className="title" onClick={openList}>
             {month} {year} 
             <FontAwesomeIcon
                  className={`fa-icon`}
                  icon={faAngleDown}
              />
        </div>
        <div className={`calender-list ${listShow}`}>
             <div className="year">
                <FontAwesomeIcon
                    className={`fa-left`}
                    icon={faAngleLeft}
                    onClick={() =>onYearChange('left')}
                />
                {year}
                <FontAwesomeIcon
                    className={`fa-right`}
                    icon={faAngleRight}
                    onClick={() =>onYearChange('right')}
                />
             </div>
             <div className="months">
                 <ul>
                     {months.map((item, key)=> {
                       return(
                          <li key={key}>
                              <label className='container-radio-sort'>
                                  {item}
                                  <input
                                    type='radio'
                                    name='sorting'
                                    checked={item === month ? true : false}
                                    onChange={()=>onMonthSelect(item)}
                                  />
                                <span className='checkmark-radio-sort' />
                              </label>
                        </li>
                       )
                     })}
                 </ul>
             </div>
        </div>
    </div>
  );
}

export default Calender;