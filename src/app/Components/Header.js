import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <AppBar position="relative" style={{"alignItems":"center", "backgroundColor":"white", "color":"black"}}>
        <Toolbar>
          <Typography variant="h4"  noWrap>
               Most Starred Repos
          </Typography>
        </Toolbar>
      </AppBar>
  )
}
