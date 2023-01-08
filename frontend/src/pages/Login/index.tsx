import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { IconButton, Typography, TextField } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { FormikProps, useFormik } from 'formik';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

import loginSchema from '../../constants/schemas/login';
import { doAsyncLogin } from '../../redux/thunks/authentication';
import routes from '../../constants/routes';
import { useAppDispatch, AppDispatch } from '../../redux/store';
import { resetLoading } from '../../redux/reducers/authenticationSlice';
import { selectAuthLoading } from '../../redux/selectors/authentication';
import Button from '../../components/MuiCustomComponents/Button';

interface FormValues {
  email: string;
  password: string;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const LoginWrapper = ({ isSmallScreen = false }: { isSmallScreen?: boolean }) => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setType] = useState('password');
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    setFieldError,
    setFieldTouched,
  }: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: initialValues,
    validationSchema: loginSchema,
    enableReinitialize: true,
    validate: (formValues: FormValues) => {
      const fieldErrors: FieldErrors = {};
      if (!validator.isEmail(formValues.email)) {
        fieldErrors['email'] = 'Enter a valid email address';
      }

      return fieldErrors;
    },
    onSubmit: (formValues: FormValues) => {
      dispatch(doAsyncLogin(formValues)).then((response) => {
        if (response.type == 'authentication/login/fulfilled') {
          dispatch(resetLoading());
          navigate(routes.protected.dashboard);
        }
      });
    },
  });

  useEffect(() => {
    if (loading === 'failed') {
      setFieldError('email', 'Invalid email or password');
      dispatch(resetLoading());
    }
  }, [loading, setFieldError, dispatch]);

  return (
    <Box
      sx={{
        backgroundColor: '#ffff',
        boxShadow: isSmallScreen ? '' : '10px 10px 14px 0px rgba(0,0,0,0.75)',
      }}
      className="w-full h-full my-20 sm:w-6/12 lg:w-4/12 xl:w-3/12 border-3"
    >
      <Box className="flex flex-col items-center justify-center mt-8 mb-4 space-y-1">
        <MonetizationOnIcon sx={{ fontSize: '3rem' }} />
        <Typography className="font-semibold text-gray-500">Cash Management</Typography>
      </Box>
      <Typography variant="subtitle2" className="mt-8 text-center">
        Log In to Cash Management
      </Typography>
      <Typography variant="body2" className="mt-4 mb-8 font-light text-center text-gray-400">
        Enter your email and password below
      </Typography>
      <Box className="px-10 mb-20 sm:px-10">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Box>
            <Typography variant="caption" className="mb-1">
              Email
            </Typography>
            <TextField
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email ? true : false}
              helperText={(touched.email && errors.email) || undefined}
              fullWidth
            />
          </Box>
          <Box className="mt-2">
            <Typography variant="caption" className="mb-1">
              Password
            </Typography>
            <TextField
              fullWidth
              type={inputType}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password ? true : false}
              helperText={(touched.password && errors.password) || undefined}
              InputProps={{
                endAdornment: !showPassword ? (
                  <IconButton
                    onClick={() => {
                      setShowPassword(true);
                      setType('text');
                    }}
                    size="large"
                  >
                    <VisibilityOffIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      setShowPassword(false);
                      setType('password');
                    }}
                    size="large"
                  >
                    <VisibilityIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
          <Button type="submit" loading={loading !== 'pending' ? false : true} className="mt-6">
            Log In
          </Button>
        </form>
      </Box>
    </Box>
  );
};

const Login = () => {
  return (
    <Fragment>
      <Box className="hidden sm:block">
        <Box
          className="flex flex-col justify-center items-center !w-full min-h-screen antialiased"
          sx={{ backgroundColor: '#363740' }}
        >
          <LoginWrapper />
        </Box>
      </Box>
      <Box className="block sm:hidden">
        <Box className="flex flex-col items-center justify-center min-h-screen antialiased">
          <LoginWrapper isSmallScreen />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Login;
