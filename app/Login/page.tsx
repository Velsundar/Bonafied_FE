"use client"
import { Box, Grid, Typography, useMediaQuery, Theme, InputLabel, InputAdornment, IconButton} from '@mui/material';
import { useState} from 'react'
import vector from '../assets/Vector.svg';
import logo from '../assets/png/logo.jpg';
import college from '../assets/png/rec.jpg';
import { TextField_v2 } from '../components/MUI/InputFields/TextFields';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ButtonV1 } from '../components/MUI/Buttons/Button';
import { COLORS } from '../utils/globals';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';



const Login = () => {
    const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [isLoading, setIsLoading] = useState(false);

// *******************| Fromik Validation |******************
  const signinSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });
  

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signinSchema,
    onSubmit: beforeLogin,
  });

  return (
    <>
    <Box
      sx={{
        height: 'fit-content',
        minHeight: '100vh',
        backgroundImage: `url(${vector})`,
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Box
        sx={{
          height: 'fit-content',
          minHeight: '85vh',
          width: '80%',
          background: '#fff',
          borderRadius: 3,
          boxShadow: '0 0.3rem 1rem rgba(0, 0, 0, 0.25)',
          p: 1,
        }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  m: 1,
                }}>
                <img
                  src={logo.src}
                  alt='logo'
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                <Typography
                  variant='h6'
                  noWrap
                  component='div'
                  sx={{
                    fontSize: 22,
                    fontWeight: '600',
                    fontFamily: 'Poppins',
                    color: '#181C32',
                    textAlign: 'center',
                  }}
                  pl={1}>
                  Bonafied Request
                </Typography>
              </Box>
              <Box
                sx={{
                  display: isMobile ? 'none' : 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 3,
                }}>
                <img src={college.src} width='80%' />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
              }}>
              <form
                // onSubmit={formik.handleSubmit}
                style={{ width: isMobile ? '90%' : '70%' }}>
                <Typography
                  style={{
                    color: '#181C32',
                    fontSize: '30px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  mb={2}>
                  Login{' '}
                  {/* <span style={{ fontWeight: '300', marginLeft: 20 }}>|</span> */}
                  {/* <span
                    style={{
                      fontSize: 16,
                      marginLeft: 20,
                      marginTop: 5,
                      color: '#68409C',
                    //   color: COLORS.secondary,
                      cursor: 'pointer',
                    }}
                    // onClick={() => {
                    //   navigate(APP_ROUTES?.REQUEST_DEMO?.pathName);
                    // }}
                    >
                    Request Demo?
                  </span> */}
                </Typography>
                <Typography
                  style={{
                    color: '#181C32',
                    fontSize: '20px',
                    fontWeight: '500',
                    // display: isMobile ? "none" : "",
                  }}
                  mb={4}>
                  Welcome Onboard With Us!
                </Typography>
                <Box pb={3}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#181C32',
                    }}>
                    Username<span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <TextField_v2
                    fullWidth
                    type='text'
                    name='username'
                    placeholder='Enter your username'
                    // value={formik?.values?.username}
                    // onBlur={formik?.handleBlur}
                    // onChange={formik.handleChange}
                    sx={{
                      background: '#F5F8FA',
                      borderRadius: 1,
                    //   border: `1px solid ${
                    //     formik.touched.username && formik.errors.username
                    //       ? 'red'
                    //       : '#F5F8FA'
                    //   }`,
                    }}
                  />
                  {/* {formik.touched.username && formik.errors.username && (
                    <Typography variant='body2' color='error'>
                      {formik.errors.username}
                    </Typography>
                  )} */}
                </Box>
                <Box>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#181C32',
                    }}>
                    Password<span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <TextField_v2
                    fullWidth
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    // value={formik?.values?.password}
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    placeholder='Enter your password'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}>
                          {showPassword ? (
                            <Visibility fontSize='small' />
                          ) : (
                            <VisibilityOff fontSize='small' />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{
                      background: '#F5F8FA',
                      borderRadius: 1,
                    //   border: `1px solid ${
                    //     formik.touched.password && formik.errors.password
                    //       ? 'red'
                    //       : '#F5F8FA'
                    //   }`,
                    }}
                  />
                  {/* {formik.touched.password && formik.errors.password && (
                    <Typography variant='body2' color='error'>
                      {formik.errors.password}
                    </Typography>
                  )} */}
                </Box>
                <Box
                  sx={{ display: 'flex', justifyContent: 'end' }}
                  pt={1}
                  pb={5}>
                  {/* <Typography
                    style={{ color: COLORS.secondary, cursor: "pointer" }}
                    onClick={() => {
                      navigate(APP_ROUTES?.FORGOT_PASSWORD?.pathName);
                    }}
                  >
                    Forgot Password?
                  </Typography> */}
                </Box>

                <ButtonV1
                  type='submit'
                  style={{
                    background:
                      isLoading ||
                      !formik.isValid ||
                      !formik.values.username ||
                      !formik.values.password
                        ? '#B0A4BF'
                        : `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                    borderRadius: '7px',
                    border: `1px ${
                      isLoading ||
                      !formik.isValid ||
                      !formik.values.username ||
                      !formik.values.password
                        ? '#B0A4BF'
                        : COLORS.primary
                    } solid`,
                    color: '#ffff',
                    fontSize: 16,
                    fontWeight: '600',
                    height: 40,
                    textTransform: 'none',
                    cursor:
                      isLoading ||
                      !formik.isValid ||
                      !formik.values.username ||
                      !formik.values.password
                        ? 'not-allowed'
                        : 'pointer',
                  }}
                  fullWidth
                  disabled={
                    isLoading ||
                    !formik.isValid ||
                    !formik.values.username ||
                    !formik.values.password
                  }>
                  {isLoading ? <div className='spinner'></div> : 'Login'}
                </ButtonV1>
                {/* <Typography mt={1} sx={{ textAlign: "center" }}>
                  Don't have an account?{" "}
                  <span
                    style={{
                      color: COLORS.secondary,
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(APP_ROUTES?.SIGN_UP?.pathName);
                    }}
                  >
                    Register
                  </span>
                </Typography> */}
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </>

  )
}

export default Login;

function beforeLogin(values: { username: string; password: string; }, formikHelpers: FormikHelpers<{ username: string; password: string; }>): void | Promise<any> {
    throw new Error('Function not implemented.');
}