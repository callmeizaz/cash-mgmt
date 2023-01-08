import React, { useState } from 'react';
// MUI
import { Grid, Card, Typography, TextField as MUiTextField, Button } from '@mui/material';
// Formik
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useSnackbar } from 'notistack';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import { AddEmployeeInterface } from '../../typings/interfaces/employee';
import addEmployeeSchema from '../../constants/schemas/addEmployee';
import { useAppDispatch } from '../../redux/store';
import { doAsyncAddEmployee } from '../../redux/thunks/employee';

const AddEmployeeComp: React.FC = () => {
  const [joinedAt, setJoinedAt] = useState<Date | null>(null);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const initialValues: AddEmployeeInterface = {
    firstName: '',
    lastName: '',
    eid: '',
    email: '',
    address: '',
    phone: '',
    designation: '',
    salary: '',
  };

  //   Handlers
  const handleDateChange = (newValue: Date | null) => {
    setJoinedAt(newValue);
  };

  const handleSubmit = (
    values: AddEmployeeInterface,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: () => void,
  ) => {
    const { firstName, lastName, email, phone, address, eid, salary, designation } = values;

    setSubmitting(true);

    dispatch(
      doAsyncAddEmployee({
        firstName,
        lastName,
        email,
        phone,
        address,
        employeeId: eid,
        salary,
        designation,
      }),
    )
      .then((res) => {
        if (res.type === 'employee/add/fulfilled') {
          enqueueSnackbar('Successfully Added Employee', {
            variant: 'success',
            autoHideDuration: 1500,
          });
          setSubmitting(false);
          resetForm();
        } else {
          setSubmitting(false);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Card className="p-4 h-full rounded-xl">
        <Grid container className="my-4">
          <Formik
            validationSchema={addEmployeeSchema}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleSubmit(values, setSubmitting, resetForm);
            }}
          >
            {(props: any) => {
              const { handleSubmit, isSubmitting } = props;

              return (
                <Form onSubmit={handleSubmit}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={5} className="mb-2">
                      <Typography className="mb-1 text-sm font-bold">First Name</Typography>
                      <Field
                        component={TextField}
                        name="firstName"
                        type="text"
                        label="First Name"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={5} className="mb-2">
                      <Typography className="mb-2 text-sm font-bold">Last Name</Typography>
                      <Field
                        component={TextField}
                        name="lastName"
                        type="text"
                        label="Last Name"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={5} className="mb-2">
                      <Typography className="mb-2 text-sm font-bold">Email</Typography>
                      <Field
                        component={TextField}
                        name="email"
                        type="text"
                        label="Email"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={5} className="mb-2">
                      <Typography className="mb-2 text-sm font-bold">Address</Typography>
                      <Field
                        component={TextField}
                        name="address"
                        type="text"
                        label="Address"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={5} className="mb-2">
                      <Typography className="mb-2 text-sm font-bold">Phone</Typography>
                      <Field
                        component={TextField}
                        name="phone"
                        type="text"
                        label="Phone"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={5} className="mb-2">
                      <Typography className="mb-1 text-sm font-bold">Joined At</Typography>
                      <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                          label="Joining Date"
                          inputFormat="MM/DD/yyyy"
                          value={joinedAt}
                          onChange={(e) => handleDateChange(e)}
                          renderInput={(params) => <MUiTextField {...params} fullWidth />}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={5} className="mb-2">
                      <Typography className="mb-2 text-sm font-bold">Designation</Typography>
                      <Field
                        component={TextField}
                        name="designation"
                        type="text"
                        label="Designation"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={5} className="mb-2">
                      <Typography className="mb-2 text-sm font-bold">Salary</Typography>
                      <Field
                        component={TextField}
                        name="salary"
                        type="text"
                        label="Salary"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={5} className="mb-2">
                      <Typography className="mb-1 text-sm font-bold">Employee Id</Typography>
                      <Field
                        component={TextField}
                        name="eid"
                        type="text"
                        label="Employee ID"
                        fullWidth
                      />
                    </Grid>
                    <Grid item container justifyContent="center" className="my-8">
                      <Grid item xs={4}>
                        <Button
                          className="rounded-lg"
                          color="primary"
                          type="submit"
                          fullWidth
                          disabled={isSubmitting}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Card>
    </Grid>
  );
};

export default AddEmployeeComp;
