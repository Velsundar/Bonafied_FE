"use client";
import NavBar from "../../../app/dashboard/navbar";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BG from "../../assets/png/rec.jpg";
import { useFormik } from "formik";
import { MenuItem } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import UnAutorizedAccess from '../../assets/png/Unauthorized_access.jpeg'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  fullName: string;
  regNo: string;
  department: string;
  year: string;
  email: string;
  fatherName: string;
  purpose: string;
  seatType: string;
}

const Userdash = () => {
  const history = useRouter();
  const [isUser, setIsUser] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const initialValues: FormValues = {
    fullName: "",
    regNo: "",
    department: "",
    year: "",
    email: "",
    fatherName: "",
    purpose: "",
    seatType: "",
  };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    regNo: Yup.string().required("Reg.No is required"),
    department: Yup.string().required("Department is required"),
    year: Yup.string().required("Year is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    fatherName: Yup.string().required("Father's Name is required"),
    purpose: Yup.string().required("purpose is required"),
  });
  const [formData, setFormData] = useState({
    fullName: "",
    regNo: "",
    department: "",
    year: "",
    email: "",
    fatherName: "",
    purpose: "",
  });

  const departments = [
    "AI & Data Science",
    "Mechanical",
    "Electronics & Communication Engineering",
    "Electrical & Electronics Engineering",
    "Civil Engineering",
    "Information Technology",
    "Computer Science Engineering",
  ];
  const purposes = [
    "Higher Studies",
    "Loan Applications",
    "Passport Applications",
  ];

  const handleSubmit = async (values: FormValues) => {
    try {
      await axios.post("http://localhost:4000/api/bonafied", values);
      toast.success("Submitted Successfully!");
      formik.resetForm();
    } catch (error: any) {
      console.error("Error:", error.response.data.message);
    }
  }
  const formik = useFormik({
    initialValues: {
      fullName: userData?.name || "",
      regNo: userData?.roll_no || "",
      email: userData?.email || "",
      department: userData?.branch || "",
      year: userData?.year || "",
      fatherName: userData?.fathername || "",
      purpose: "",
      seatType: userData?.seatType || "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (!token|| userRole !== "user") {
      history.push("/");
    } else {
      setIsTokenPresent(true);
      setIsUser(true);
      const userDataString = localStorage.getItem("userData");
      let userDataLocal: any = null;
      if (userDataString) {
        userDataLocal = JSON.parse(userDataString);
        setUserData(userDataLocal);
      }
    }
  }, [history]);
  useEffect(() => {
    formik.setValues({
      fullName: userData?.name || "",
      regNo: userData?.roll_no || "",
      email: userData?.email || "",
      department: userData?.branch || "",
      year: userData?.year || "",
      fatherName: userData?.fathername || "",
      purpose: "",
      seatType: userData?.seatType || "",
    });
  }, [userData]);

  if (!isTokenPresent || !isUser) {
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
          color: 'white',
          fontSize: '35px',
          textAlign: 'center',
        }}
      >
        Unauthorized - Please log in
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${BG.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Box>
        <NavBar />
        <Container maxWidth="sm">
          <Box mt={2}>
            <Paper
              elevation={0}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                padding: "20px",
                borderRadius: "8px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                maxHeight: "90vh",
                overflowY: "auto",
                // @ts-ignore
                "&::-webkit-scrollbar": {
                  width: 0,
                },
                scrollbarWidth: "none",
                "-ms-overflow-style": "none",
              }}
            >
              <form onSubmit={formik.handleSubmit}>
                <Typography variant="h4" align="center" gutterBottom>
                  Bonafied Application
                </Typography>
                <Box mb={2}>
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name *"
                  value={userData?.name || ""}
                  disabled
                />
              </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="regNo"
                    name="regNo"
                    label="Registration Number *"
                    value={userData?.roll_no}
                    disabled
                    InputLabelProps={{ style: { color: 'rgba(0, 0, 0, 0.87)' } }}
                    InputProps={{ style: { color: 'rgba(0, 0, 0, 0.87)', opacity: 1 } }}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email *"
                    type="email"
                    value={userData?.email}
                    disabled
                    InputLabelProps={{ style: { color: 'rgba(0, 0, 0, 0.87)' } }}
                    InputProps={{ style: { color: 'rgba(0, 0, 0, 0.87)', opacity: 1 } }}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="department"
                    name="department"
                    label="Brnch *"
                    type="text"
                    value={userData?.branch}
                    disabled
                    InputLabelProps={{ style: { color: 'rgba(0, 0, 0, 0.87)' } }}
                    InputProps={{ style: { color: 'rgba(0, 0, 0, 0.87)', opacity: 1 } }}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="year"
                    name="year"
                    label="Year *"
                    value={userData?.year}
                    disabled
                    InputLabelProps={{ style: { color: 'rgba(0, 0, 0, 0.87)' } }}
                    InputProps={{ style: { color: 'rgba(0, 0, 0, 0.87)', opacity: 1 } }}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="fatherName"
                    name="fatherName"
                    label="Father's Name *"
                    value={userData.fathername}
                    disabled
                    InputLabelProps={{ style: { color: 'rgba(0, 0, 0, 0.87)' } }}
                    InputProps={{ style: { color: 'rgba(0, 0, 0, 0.87)', opacity: 1 } }}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="purpose"
                    name="purpose"
                    label="Purpose *"
                    value={formik.values.purpose}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.purpose && Boolean(formik.errors.purpose)
                    }
                    helperText={formik.touched.purpose && formik.errors.purpose}
                    onBlur={formik.handleBlur}
                    select
                  >
                    {purposes.map((purpose) => (
                      <MenuItem key={purpose} value={purpose}>
                        {purpose}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Paper>
          </Box>
        </Container>
        <ToastContainer />
      </Box>
    </div>
  );
};

export default Userdash;
