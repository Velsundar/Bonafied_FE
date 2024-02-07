"use client"
import NavBar from '../../../app/dashboard/navbar'
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Admindash = () => {
  const history = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/");
    }
  }, [history]);

  const token = localStorage.getItem("token");
  if (!token) {
    return null; // or <LoadingIndicator />
  }
  
  return (
    <Box>
      <NavBar/>
    </Box>
  )
}

export default Admindash;
