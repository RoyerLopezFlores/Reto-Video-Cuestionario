import React from 'react'
import { Button } from '@mui/material';
const butonGeneralStyle={
  background:'#ff0000', 
  '&:hover':
    {background:'#ff5500'}
}
export default function ButtonPrincipal({text,onClick}) {
  return (
    <Button sx={butonGeneralStyle} variant="contained" onClick={onClick}>{text||"default"}</Button>
  )
}
