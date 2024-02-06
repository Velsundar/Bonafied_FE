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
import React, { useState } from "react";
import BG from "../../assets/png/rec.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormValues {
  fullName: string;
  regNo: string;
  department: string;
  year: string;
  email: string;
  fatherName: string;
}

const Userdash = () => {
  const initialValues: FormValues = {
    fullName: "",
    regNo: "",
    department: "",
    year: "",
    email: "",
    fatherName: "",
  };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    regNo: Yup.string().required("Reg.No is required"),
    department: Yup.string().required("Department is required"),
    year: Yup.string().required("Year is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    fatherName: Yup.string().required("Father's Name is required"),
  });
  const [formData, setFormData] = useState({
    fullName: "",
    regNo: "",
    department: "",
    year: "",
    email: "",
    fatherName: "",
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formData);
  };

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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form style={{ color: "black" }}>
                    <Box mt={2} textAlign="center">
                      <Typography variant="h5" style={{ userSelect: "none" }}>
                        Bonafied Application
                      </Typography>
                    </Box>
                    <Box mt={2}>
                      <Field
                        as={TextField}
                        label="Full Name"
                        name="fullName"
                        fullWidth
                        variant="outlined"
                        required
                        error={touched.fullName && Boolean(errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                      />
                    </Box>
                    <Box mt={2}>
                      <Field
                        as={TextField}
                        label="Registration Number"
                        name="regNo"
                        fullWidth
                        variant="outlined"
                        required
                      />
                      <ErrorMessage name="regNo" component="div" />
                    </Box>
                    <Box mt={2}>
                      <Field
                        as={TextField}
                        label="Department"
                        name="department"
                        fullWidth
                        variant="outlined"
                        required
                      />
                      <ErrorMessage name="department" component="div" />
                    </Box>
                    <Box mt={2}>
                      <Field
                        as={TextField}
                        label="Year"
                        name="year"
                        fullWidth
                        variant="outlined"
                        required
                      />
                      <ErrorMessage name="year" component="div" />
                    </Box>
                    <Box mt={2}>
                      <Field
                        as={TextField}
                        label="Email"
                        name="email"
                        fullWidth
                        variant="outlined"
                        required
                      />
                      <ErrorMessage name="email" component="div" />
                    </Box>
                    <Box mt={2}>
                      <Field
                        as={TextField}
                        label="Father's Name"
                        name="fatherName"
                        fullWidth
                        variant="outlined"
                        required
                      />
                      <ErrorMessage name="fatherName" component="div" />
                    </Box>
                    <Box mt={2} textAlign="center">
                      <Button
                        type="submit"
                        variant="contained"
                        style={{ backgroundColor: "#f44336", color: "#ffffff" }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Userdash;
