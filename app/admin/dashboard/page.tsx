"use client"
import NavBar from '../../../app/dashboard/navbar'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import UnAutorizedAccess from '../../assets/png/Unauthorized_access.jpeg'
import MiniDrawer from '../../..//app/components/MUI/Drawer/Drawer'

const Admindash = () => {
  const history = useRouter();
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/");
    } else {
      setIsTokenPresent(true);
    }
  }, [history]);

  if (!isTokenPresent) {
    return (
      <div
        style={{
          backgroundImage: `url(${UnAutorizedAccess.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'black',
          fontWeight:800,
          fontSize: '35px',
          textAlign: 'center',
        }}
      >
        Unauthorized - Please log in
      </div>
    );
  }


  return (
    <Box>
      {/* <NavBar/> */}
      <MiniDrawer/>
      <Box>
        <Typography>hello world</Typography>
      </Box>
    </Box>
  )
}

export default Admindash;
