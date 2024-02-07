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

interface FormValues {
  fullName: string;
  regNo: string;
  department: string;
  year: string;
  email: string;
  fatherName: string;
  purpose: string;
}

const Userdash = () => {
  const history = useRouter();
  const initialValues: FormValues = {
    fullName: "",
    regNo: "",
    department: "",
    year: "",
    email: "",
    fatherName: "",
    purpose: "",
  };
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
    "Mechanical",
    "Electronics & Computer Application",
    "Electrical & Electronics Engineering",
    "Civil Engineering",
    "Information Technology",
    "Computer Science Engineering",
  ]; // Sample department options
  const purposes = [
    "Higher Studies",
    "Loan Applications",
    "Passport Applications",
  ];

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/bonafied",
        values
      );

      console.log("Bonafied created successfully:", response.data);
    } catch (error: any) {
      console.error("Error:", error.response.data.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      fullName: "",
      regNo: "",
      email: "",
      department: "",
      year: "",
      fatherName: "",
      purpose: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
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
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.fullName && Boolean(formik.errors.fullName)
                    }
                    helperText={
                      formik.touched.fullName && formik.errors.fullName
                    }
                    onBlur={formik.handleBlur}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="regNo"
                    name="regNo"
                    label="Registration Number *"
                    value={formik.values.regNo}
                    onChange={formik.handleChange}
                    error={formik.touched.regNo && Boolean(formik.errors.regNo)}
                    helperText={formik.touched.regNo && formik.errors.regNo}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email *"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    select
                    id="department"
                    name="department"
                    label="Department *"
                    value={formik.values.department}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.department &&
                      Boolean(formik.errors.department)
                    }
                    helperText={
                      formik.touched.department && formik.errors.department
                    }
                    onBlur={formik.handleBlur}
                  >
                    {departments.map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="year"
                    name="year"
                    label="Year *"
                    value={formik.values.year}
                    onChange={formik.handleChange}
                    error={formik.touched.year && Boolean(formik.errors.year)}
                    helperText={formik.touched.year && formik.errors.year}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="fatherName"
                    name="fatherName"
                    label="Father's Name *"
                    value={formik.values.fatherName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.fatherName &&
                      Boolean(formik.errors.fatherName)
                    }
                    helperText={
                      formik.touched.fatherName && formik.errors.fatherName
                    }
                    onBlur={formik.handleBlur}
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
      </Box>
    </div>
  );
};

export default Userdash;
