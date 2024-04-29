/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { FormEvent, useEffect, useState } from "react";
import MiniDrawer from "../../..//app/components/MUI/Drawer/Drawer";
import PaperLayout from "../../../app/components/MUI/PaperLayout/PaperLayout";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Theme,
  Typography,
  useMediaQuery,
  Select,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import { COLORS } from "../../utils/globals";
import vector from "../../assets/Vector.svg";
import S10Login from "../../assets/png/rec.jpg";
import logo from "../../assets/png/logo.jpg";
import { TextField_v2 } from "../../components/MUI/InputFields/TextFields";
import { ButtonV1 } from "../../components/MUI/Buttons/Button";
import { createTheme } from "@mui/material/styles";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { DEPARTMENTS } from "../../../app/data/AppConst";
import { toast } from 'react-toastify';

interface ApiResponse {
  id: string;
  name: string;
}
interface IRegister {
  name: string;
  email: string;
  password: string;
  roll_no: string;
  phoneNumber: string;
  department: string;
  year: string;
  gender: string;
  father_name: string;
  mode: string;
  seat_type: string;
  role: "user" | "admin" | undefined;
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
  const history = useRouter();
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [role, setRole] = useState<"user" | "admin">();
console.log("role",role)
  const registerSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().required("Email Id is required"),
    password: Yup.string().required("Password is required"),
    roll_no: Yup.string().required("Reg. Number is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    department: Yup.string().required("Department is required"),
    year: Yup.string().required("Year is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      roll_no: "",
      phoneNumber: "",
      department: "",
      year: "",
      gender: "",
      father_name: "",
      mode: "",
      seat_type: "",
      role: role
    },
    validationSchema: registerSchema,
    onSubmit: beforeLogin,
  });
  useEffect(() => {
    formik.setFieldValue("role", role);
  }, [role]);
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
    axios
      .post("http://localhost:4000/api/register", formik?.values)
      .then((response) => {
        console.log("Registration successful:", response.data);
        toast.success('Registration successful');
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        toast.error('Registration failed');
      });
  }
  console.log("formikvalues", formik.values);

  return (
    <Box
      style={{ display: "flex", height: "calc(100vh - 120px)", width: "100%" }}
    >
      <MiniDrawer />
      <PaperLayout
        elevation={3}
        hasBackgroundImage={true}
        style={{
          height: "100%",
          marginTop: "90px",
          padding: "20px",
          width: "calc(100vw - 200px)",
        }}
      >
        <Box sx={{ flexGrow: 1, padding: "20px" }}>
          <Grid container sx={{ justifyContent: "center" }}>
            <form
              onSubmit={handleRegister}
              style={{
                width: isMobile ? "90%" : "70%",
                maxHeight: "85vh",
              }}
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
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
                    name="name"
                    type="text"
                    value={formik?.values?.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Enter your Name"
                    sx={{
                      background: "#F5F8FA",
                      borderRadius: 1,
                      border: `1 px solid ${
                        formik.touched.name && formik.errors.name
                          ? "red"
                          : "#F5F8FA"
                      }`,
                    }}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <Typography variant="body2" color="error">
                      {formik.errors.name}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
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
                        formik.touched.email && formik.errors.email
                          ? "red"
                          : "#F5F8FA"
                      }`,
                    }}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <Typography variant="body2" color="error">
                      {formik.errors.email}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
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
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#181C32",
                    }}
                  >
                    Registration Number
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField_v2
                    fullWidth
                    name="roll_no"
                    type="text"
                    value={formik?.values?.roll_no}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Enter your Reg. Number"
                    sx={{
                      background: "#F5F8FA",
                      borderRadius: 1,
                      border: `1px solid ${
                        formik.touched.roll_no &&
                        formik.errors.roll_no
                          ? "red"
                          : "#F5F8FA"
                      }`,
                    }}
                  />
                  {formik.touched.roll_no &&
                    formik.errors.roll_no && (
                      <Typography variant="body2" color="error">
                        {formik.errors.roll_no}
                      </Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
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
                        formik.touched.phoneNumber && formik.errors.phoneNumber
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
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <Typography variant="body2" color="error">
                      {formik.errors.phoneNumber}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
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
                  <Select
                    fullWidth
                    size="small"
                    name="department"
                    value={formik.values.department}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Select Department"
                    sx={{
                      background: "#F5F8FA",
                      borderRadius: 1,
                      border: `1px solid ${
                        formik.touched.department && formik.errors.department
                          ? "red"
                          : "#F5F8FA"
                      }`,
                      mb: 2,
                    }}
                  >
                    {DEPARTMENTS.map((department, index) => (
                      <MenuItem key={index} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.department && formik.errors.department && (
                    <Typography variant="body2" color="error">
                      {formik.errors.department}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
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
                    name="year"
                    type="password"
                    value={formik?.values?.year}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="(Eg.)2014"
                    sx={{
                      background: "#F5F8FA",
                      borderRadius: 1,
                      border: `1px solid ${
                        formik.touched.year && formik.errors.year
                          ? "red"
                          : "#F5F8FA"
                      }`,
                      mb: 2,
                    }}
                  />
                  {formik.touched.year && formik.errors.year && (
                    <Typography variant="body2" color="error">
                      {formik.errors.year}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#181C32",
                    }}
                  >
                    Gender<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField_v2
                    fullWidth
                    name="gender"
                    type="text"
                    value={formik?.values?.gender}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Gender"
                    sx={{
                      background: "#F5F8FA",
                      borderRadius: 1,
                      border: `1px solid ${
                        formik.touched.gender && formik.errors.gender
                          ? "red"
                          : "#F5F8FA"
                      }`,
                      mb: 2,
                    }}
                  />
                  {formik.touched.gender && formik.errors.gender && (
                    <Typography variant="body2" color="error">
                      {formik.errors.gender}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#181C32",
                    }}
                  >
                    Father Name<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField_v2
                    fullWidth
                    name="father_name"
                    type="text"
                    value={formik?.values?.father_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Father's name"
                    sx={{
                      background: "#F5F8FA",
                      borderRadius: 1,
                      border: `1px solid ${
                        formik.touched.father_name && formik.errors.father_name
                          ? "red"
                          : "#F5F8FA"
                      }`,
                      mb: 2,
                    }}
                  />
                  {formik.touched.father_name && formik.errors.father_name && (
                    <Typography variant="body2" color="error">
                      {formik.errors.father_name}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#181C32",
                    }}
                  >
                    Mode<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField_v2
                    fullWidth
                    name="mode"
                    type="text"
                    value={formik?.values?.mode}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="UG/PG"
                    sx={{
                      background: "#F5F8FA",
                      borderRadius: 1,
                      border: `1px solid ${
                        formik.touched.mode && formik.errors.mode
                          ? "red"
                          : "#F5F8FA"
                      }`,
                      mb: 2,
                    }}
                  />
                  {formik.touched.mode && formik.errors.mode && (
                    <Typography variant="body2" color="error">
                      {formik.errors.mode}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#181C32",
                    }}
                  >
                    Seat Type<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField_v2
                    fullWidth
                    name="seat_type"
                    type="text"
                    value={formik?.values?.seat_type}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Government/Management"
                    sx={{
                      background: "#F5F8FA",
                      borderRadius: 1,
                      border: `1px solid ${
                        formik.touched.seat_type && formik.errors.seat_type
                          ? "red"
                          : "#F5F8FA"
                      }`,
                      mb: 2,
                    }}
                  />
                  {formik.touched.seat_type && formik.errors.seat_type && (
                    <Typography variant="body2" color="error">
                      {formik.errors.seat_type}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#181C32",
                    }}
                  >
                    Role<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Select
                    fullWidth
                    size="small"
                    name="role"
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value as "user" | "admin")
                    }
                    onBlur={formik.handleBlur}
                    placeholder="Select Role"
                    sx={{
                      background: "#F5F8FA",
                      borderRadius: 1,
                      border: `1px solid ${
                        formik.touched.role && formik.errors.role
                          ? "red"
                          : "#F5F8FA"
                      }`,
                      mb: 2,
                    }}
                  >
                    <MenuItem value="user">user</MenuItem>
                    <MenuItem value="admin">admin</MenuItem>
                  </Select>
                  {formik.touched.role && formik.errors.role && (
                    <Typography variant="body2" color="error">
                      {formik.errors.role}
                    </Typography>
                  )}
                </Grid>
              </Grid>
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
          </Grid>
        </Box>
      </PaperLayout>
    </Box>
  );
}

function beforeLogin(
  values: {
    name: string;
    email: string;
    password: string;
    roll_no: string;
    phoneNumber: string;
    department: string;
    year: string;
    gender: string;
    father_name: string;
    mode: string;
    seat_type: string;
    role: "user" | "admin" | undefined;
  },
  formikHelpers: FormikHelpers<{
    name: string;
    email: string;
    password: string;
    roll_no: string;
    phoneNumber: string;
    department: string;
    year: string;
    gender: string;
    father_name: string;
    mode: string;
    seat_type: string;
    role: "user" | "admin" | undefined;
  }>
): void | Promise<any> {
  throw new Error("Function not implemented.");
}
