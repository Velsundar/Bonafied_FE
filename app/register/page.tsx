/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import { COLORS } from "../utils/globals";
import vector from "../assets/Vector.svg";
import S10Login from "../assets/png/rec.jpg";
import logo from "../assets/png/logo.jpg";
import { TextField_v2 } from "../components/MUI/InputFields/TextFields";
import { ButtonV1 } from "../components/MUI/Buttons/Button";
import { createTheme } from "@mui/material/styles";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';

interface ApiResponse {
  id: string;
  name: string;
}
interface IRegister {
  fullName: string;
  email: string;
  password: string;
  registrationNumber: string;
  phoneNumber: string;
  department: string;
  batch: string;
  role: string;
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default function SignUp() {
  const navigate = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const registerSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().required("Email Id is required"),
    password: Yup.string().required("Password is required"),
    registrationNumber: Yup.string().required("Reg. Number is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    department: Yup.string().required("Department is required"),
    batch: Yup.string().required("Batch is required"),
  });
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      registrationNumber: "",
      phoneNumber: "",
      department: "",
      batch: "",
    },
    validationSchema: registerSchema,
    onSubmit: beforeLogin,
  });

  // const [formData, setFormData] = useState<IRegister>({
  //   fullName: "",
  //   email: "",
  //   password: "",
  //   registrationNumber: "",
  //   phoneNumber: "",
  //   department: "",
  //   batch: "",
  //   role: "",
  // });

  // const [formErrors, setFormErrors] = useState<Partial<IRegister>>({});

  // const handleInputChange = (field: keyof IRegister, value: string) => {
  //   setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  //   setFormData((prevData) => ({ ...prevData, [field]: value }));
  // };

  const isValidInput = (value: any, type?: any, len?: any) => {
    function extraValidation(val: any) {
      if (type === "number") {
        console.log("REG EXP", /^\d+$/.test(val));
        return /^\d+$/.test(val) && (len ? val?.length === len : true);
      }
      return Boolean(val);
    }
    if (typeof value === "string") {
      return Boolean(extraValidation(value.trim()));
    } else {
      return Boolean(value);
    }
  };
  function handleRegister(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
      axios.post('https://backendbe.onrender.com/api/register', formik?.values)
      .then((response) => {
        console.log('Registration successful:', response.data);
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  }
console.log('formikvalues',formik.values);

  return (
    <>
      <Box
        sx={{
          height: "fit-content",
          minHeight: "100vh",
          backgroundImage: `url(${vector.src})`,
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "fit-content",
            minHeight: "85vh",
            width: "80%",
            background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1.0)), url(${S10Login.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            overflow: "hidden",
            position: "relative",
            borderRadius: 3,
            boxShadow: "0 0.3rem 1rem rgba(0, 0, 0, 0.25)",
            p: 1,
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    m: 1,
                  }}
                >
                  <img
                    src={logo.src}
                    alt="logo"
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      fontSize: 22,
                      fontWeight: "600",
                      fontFamily: "Poppins",
                      color: "#181C32",
                      textAlign: "center",
                    }}
                    pl={1}
                  >
                    Sri RamaKrishna Engineering College
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: isMobile ? "none" : "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 3,
                    width: "100%",
                  }}
                >
                  <img
                    src={S10Login.src}
                    width="90%"
                    style={{
                      height: "300px",
                      border: "none",
                      borderRadius: "15px",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: 0,
                  },
                  scrollbarWidth: "none",
                  "-ms-overflow-style": "none",
                }}
              >
                <form
                  onSubmit={handleRegister}
                  style={{ width: isMobile ? "90%" : "70%", maxHeight: "85vh" }}
                >
                  <Typography
                    style={{
                      color: "#181C32",
                      fontSize: "30px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                    }}
                    mb={2}
                  >
                    Register{" "}
                  </Typography>
                  <Typography
                    style={{
                      color: "#181C32",
                      fontSize: "20px",
                      fontWeight: "500",
                      display: isMobile ? "none" : "",
                    }}
                    mb={3}
                  >
                    Welcome Onboard With Us!
                  </Typography>
                  <Box>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#181C32",
                      }}
                    >
                      Name<span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <TextField_v2
                      fullWidth
                      name="fullName"
                      type="text"
                      value={formik?.values?.fullName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Enter your Name"
                      sx={{
                        background: "#F5F8FA",
                        borderRadius: 1,
                        border: `1px solid ${
                          formik.touched.fullName &&
                          formik.errors.fullName
                            ? "red"
                            : "#F5F8FA"
                        }`,
                      }}
                    />
                    {formik.touched.fullName &&
                      formik.errors.fullName && (
                        <Typography variant="body2" color="error">
                          {formik.errors.fullName}
                        </Typography>
                      )}
                  </Box>
                  <Box>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#181C32",
                      }}
                    >
                      Email Id<span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <TextField_v2
                      fullWidth
                      name="email"
                      type="text"
                      value={formik?.values?.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Enter your Email Id"
                      sx={{
                        background: "#F5F8FA",
                        borderRadius: 1,
                        border: `1px solid ${
                          formik.touched.email &&
                          formik.errors.email
                            ? "red"
                            : "#F5F8FA"
                        }`,
                      }}
                    />
                    {formik.touched.email &&
                      formik.errors.email && (
                        <Typography variant="body2" color="error">
                          {formik.errors.email}
                        </Typography>
                      )}
                  </Box>
                  <Box>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#181C32",
                      }}
                    >
                      Password<span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <TextField_v2
                      fullWidth
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formik?.values?.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Enter your password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? (
                              <Visibility fontSize="small" />
                            ) : (
                              <VisibilityOff fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{
                        background: "#F5F8FA",
                        borderRadius: 1,
                        border: `1px solid ${
                          formik.touched.password && formik.errors.password
                            ? "red"
                            : "#F5F8FA"
                        }`,
                      }}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <Typography variant="body2" color="error">
                        {formik.errors.password}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#181C32",
                      }}
                    >
                      Registration Number<span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <TextField_v2
                      fullWidth
                      name="registrationNumber"
                      type="text"
                      value={formik?.values?.registrationNumber}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Enter your Reg. Number"
                      sx={{
                        background: "#F5F8FA",
                        borderRadius: 1,
                        border: `1px solid ${
                          formik.touched.registrationNumber &&
                          formik.errors.registrationNumber
                            ? "red"
                            : "#F5F8FA"
                        }`,
                      }}
                    />
                    {formik.touched.registrationNumber &&
                      formik.errors.registrationNumber && (
                        <Typography variant="body2" color="error">
                          {formik.errors.registrationNumber}
                        </Typography>
                      )}
                  </Box>
                  <Box>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#181C32",
                      }}
                    >
                      Phone Number<span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <TextField_v2
                      fullWidth
                      name="phoneNumber"
                      type="number"
                      value={formik?.values?.phoneNumber}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Enter your Phone Number"
                      sx={{
                        background: "#F5F8FA",
                        borderRadius: 1,
                        border: `1px solid ${
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                            ? "red"
                            : "#F5F8FA"
                        }`,
                        "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button":
                          {
                            "-webkit-appearance": "none",
                            margin: 0,
                          },
                        "& input[type=number]": {
                          "-moz-appearance": "textfield",
                        },
                      }}
                    />
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
                        <Typography variant="body2" color="error">
                          {formik.errors.phoneNumber}
                        </Typography>
                      )}
                  </Box>
                  <Box>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#181C32",
                      }}
                    >
                      Department<span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <TextField_v2
                      fullWidth
                      name="department"
                      type="text"
                      value={formik?.values?.department}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Enter your Department"
                      sx={{
                        background: "#F5F8FA",
                        borderRadius: 1,
                        border: `1px solid ${
                          formik.touched.department && formik.errors.department
                            ? "red"
                            : "#F5F8FA"
                        }`,
                      }}
                    />
                    {formik.touched.department && formik.errors.department && (
                      <Typography variant="body2" color="error">
                        {formik.errors.department}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#181C32",
                      }}
                    >
                      Batch<span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <TextField_v2
                      fullWidth
                      name="batch"
                      type="password"
                      value={formik?.values?.batch}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="(Eg.)2014"
                      sx={{
                        background: "#F5F8FA",
                        borderRadius: 1,
                        border: `1px solid ${
                          formik.touched.batch && formik.errors.batch
                            ? "red"
                            : "#F5F8FA"
                        }`,
                        mb: 2,
                      }}
                    />
                    {formik.touched.batch && formik.errors.batch && (
                      <Typography variant="body2" color="error">
                        {formik.errors.department}
                      </Typography>
                    )}
                  </Box>
                  <ButtonV1
                    type="submit"
                    style={{
                      background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                      borderRadius: "7px",
                      color: "#ffff",
                      fontSize: 16,
                      fontWeight: "600",
                      height: 40,
                      textTransform: "none",
                    }}
                    fullWidth
                    disabled={isLoading ? true : false}
                  >
                    {isLoading ? <div className="spinner"></div> : "Register"}
                  </ButtonV1>
                  <Typography
                    mt={1}
                    sx={{ textAlign: "center" }}
                    style={{ color: COLORS.secondary }}
                  >
                    Already have an account?{" "}
                    <span
                      style={{
                        color: COLORS.secondary,
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate.push("/");
                      }}
                    >
                      Login
                    </span>
                  </Typography>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
function beforeLogin(
  values: {
    fullName: string;
    email: string;
    password: string;
    registrationNumber: string;
    phoneNumber: string;
    department: string;
    batch: string;
  },
  formikHelpers: FormikHelpers<{
    fullName: string;
    email: string;
    password: string;
    registrationNumber: string;
    phoneNumber: string;
    department: string;
    batch: string;
  }>
): void | Promise<any> {
  throw new Error("Function not implemented.");
}
