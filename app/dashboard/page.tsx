"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from './navbar';
import { Box } from '@mui/material';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, []);

  return <Box>
    <NavBar/>
    <div>This is the dashboard</div>
  </Box>
};

export default Dashboard;
