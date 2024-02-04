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
  email: string;
  phoneNumber: string;
  address: string;
  district: string;
  country: string;
  state: string;
}


const Userdash = () => {
  const initialValues: FormValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  district: "",
  country: "",
  state: "",
};
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    district: Yup.string().required("District is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
  });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    district: "",
    country: "",
    state: "",
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
                        label="Phone Number"
                        name="phoneNumber"
                        fullWidth
                        variant="outlined"
                        required
                      />
                      <ErrorMessage name="phoneNumber" component="div" />
                    </Box>
                    <Box mt={2}>
                      <Field
                        as={TextField}
                        label="Address"
                        name="address"
                        fullWidth
                        variant="outlined"
                        required
                      />
                      <ErrorMessage name="address" component="div" />
                    </Box>
                    <Box mt={2}>
                      <Field
                        as={TextField}
                        label="District"
                        name="district"
                        fullWidth
                        variant="outlined"
                        required
                      />
                      <ErrorMessage name="district" component="div" />
                    </Box>
                    <Box mt={2}>
                      <Field
                        as={TextField}
                        label="Country"
                        name="country"
                        fullWidth
                        variant="outlined"
                        required
                      />
                      <ErrorMessage name="country" component="div" />
                    </Box>
                    <Box mt={2}>
                      <Field
                        as={TextField}
                        label="State"
                        name="state"
                        fullWidth
                        variant="outlined"
                        required
                      />
                      <ErrorMessage name="state" component="div" />
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
