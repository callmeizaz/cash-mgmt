import React, { useState, useEffect } from 'react';
import moment from 'moment';
// MUI
import {
  Grid,
  Card,
  Typography,
  TextField as MUiTextField,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Button,
} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
// Formik
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';

// Styles
import { PhotoCamera } from '@mui/icons-material';
import { useAppDispatch } from '../../redux/store';
import addBillSchema from '../../constants/schemas/addBill';
import { doAsyncAddBill } from '../../redux/thunks/bill';
import { doAsyncFetchEmployees } from '../../redux/thunks/employee';
import { useSnackbar } from 'notistack';

interface BillFormValues {
  amount: string;
  addedBy: string;
  billType: string;
}

const BillTypes = ['Regular', 'Incentive', 'Bonus'];

const BillForm: React.FC = () => {
  const [employees, setEmployees] = useState([]);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<Date | null>(null);
  const [file, setFile] = useState<any | null>(null);
  const [radioVal, setRadioVal] = useState('yes');
  const initialValues: BillFormValues = {
    amount: '',
    addedBy: '',
    billType: '',
  };
  const { enqueueSnackbar } = useSnackbar();

  // fetch employees
  useEffect(() => {
    dispatch(doAsyncFetchEmployees())
      .then((res) => {
        if (res.type === 'fetch/employee/fulfilled') {
          const { data } = res.payload;
          const names = data.map((item: any) => item?.email);

          setEmployees(names);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  //   Handlers
  const handleDateChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioVal((event.target as HTMLInputElement).value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (values: BillFormValues, setSubmitting: any) => {
    const { amount, billType, addedBy } = values;

    const actualExpense = radioVal === 'yes' ? 'true' : 'false';
    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('billType', billType);
    formData.append('actualExpense', actualExpense);
    formData.append('uploadedBy', addedBy);
    formData.append('billDate', moment(value).unix() as unknown as string);
    formData.append('bill', file);

    setSubmitting(true);

    dispatch(
      doAsyncAddBill({
        formData,
      }),
    )
      .then((res) => {
        if (res.type === 'bill/add/fulfilled') {
          const { message } = res.payload;
          console.log("🚀'🚀 🚀 🚀 🚀 🚀 GOT DATA 🚀 🚀 🚀 🚀 🚀", res.payload);
          // alert('Yay Bill Added');
          enqueueSnackbar(message, {
            variant: 'success',
            autoHideDuration: 1500,
          });
          setSubmitting(false);
        } else {
          setSubmitting(false);
        }
      })
      .catch((err) => {
        console.error('🐛🐛🐛 ERROR 🐛🐛🐛', err);
      });
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" className="sm:h-screen">
        <Grid item xs={12} sm={4}>
          <Card className="p-4 rounded-xl">
            <Grid container>
              <Grid item className="mb-2">
                <Typography variant="h5" color="primary" className="font-medium">
                  Add Bill
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Formik
                  validationSchema={addBillSchema}
                  initialValues={initialValues}
                  onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values, setSubmitting);
                  }}
                >
                  {(props: any) => {
                    const { handleSubmit, isSubmitting, setFieldValue, touched, errors } = props;

                    return (
                      <Form onSubmit={handleSubmit}>
                        <Grid container direction="column">
                          <Grid item className="mb-2">
                            <Typography className="mb-1 text-sm font-bold">Date</Typography>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                              <DesktopDatePicker
                                label="Date"
                                inputFormat="MM/DD/yyyy"
                                value={value}
                                onChange={handleDateChange}
                                renderInput={(params) => <MUiTextField {...params} fullWidth />}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item className="mb-2">
                            <Typography className="mb-1 text-sm font-bold">Amount</Typography>
                            <Field
                              component={TextField}
                              name="amount"
                              type="text"
                              label="Amount.."
                              fullWidth
                            />
                          </Grid>
                          <Grid item className="mb-2">
                            <Typography className="mb-2 text-sm font-bold">Bill Type</Typography>
                            <Autocomplete
                              disablePortal
                              options={BillTypes}
                              onChange={(event: any, newValue: string | null) => {
                                setFieldValue('billType', newValue);
                              }}
                              renderInput={(params) => (
                                <MUiTextField
                                  {...params}
                                  label="Bill Type"
                                  name="billType"
                                  error={Boolean(touched.billType && errors.billType)}
                                  helperText={touched.billType && errors.billType}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item className="mb-2">
                            <Typography className="mb-2 text-sm font-bold">
                              Reimbursement
                            </Typography>

                            <RadioGroup row value={radioVal} onChange={handleRadioChange}>
                              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                              <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                          </Grid>

                          <Grid item className="mb-2">
                            <Typography className="mb-2 text-sm font-bold">Added By</Typography>
                            <Autocomplete
                              disablePortal
                              options={employees}
                              onChange={(event: any, newValue: string | null) => {
                                setFieldValue('addedBy', newValue);
                              }}
                              renderInput={(params) => (
                                <MUiTextField
                                  {...params}
                                  label="Expense added by"
                                  name="addedBy"
                                  error={Boolean(touched.addedBy && errors.addedBy)}
                                  helperText={touched.addedBy && errors.addedBy}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item container className="mb-4" alignItems="center">
                            <Grid item>
                              <Typography className="text-sm font-bold ">Upload Bill</Typography>
                            </Grid>
                            <Grid item>
                              <label htmlFor="icon-button-file">
                                <input
                                  id="icon-button-file"
                                  accept="image/*"
                                  type="file"
                                  className="hidden"
                                  onChange={handleChange}
                                />
                                <IconButton
                                  color="primary"
                                  aria-label="upload bill"
                                  component="span"
                                >
                                  <PhotoCamera />
                                </IconButton>
                              </label>
                            </Grid>
                            {file && <Typography>{file.name}</Typography>}
                          </Grid>

                          <Grid item className="mb-4">
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
                      </Form>
                    );
                  }}
                </Formik>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default BillForm;
