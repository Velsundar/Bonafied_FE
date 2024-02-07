"use client"
import NavBar from '../../../app/dashboard/navbar'
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import UnAutorizedAccess from '../../assets/png/Unauthorized_access.jpeg'

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
    return (
      <div
        style={{
          backgroundImage: `url(${UnAutorizedAccess})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '24px',
          textAlign: 'center',
        }}
      >
        Unauthorized - Please log in
      </div>
    );
  }
  return (
    <Box>
      <NavBar/>
    </Box>
  )
}

export default Admindash;
