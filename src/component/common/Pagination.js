import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export default function PaginationSize({count, pageSize, currentPage, changePage}) {
  const classes = useStyles()
  const pagesCount = Math.ceil(count / pageSize)

  const handleChange = (event, value) => {
     changePage(value)
  }
  if (pagesCount === 1) 
    return null

  return (
    <div className={classes.root}>
      <Pagination count={pagesCount} page={currentPage} onChange={handleChange}/>
    </div>
  )
}
