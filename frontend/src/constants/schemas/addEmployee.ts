import * as Yup from 'yup';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const addEmployeeSchema = Yup.object().shape({
  firstName: Yup.string().max(25).required('First Name is required'),
  lastName: Yup.string().max(25).required('Last Name is required'),
  phone: Yup.string()
    .min(10)
    .max(12)
    .matches(phoneRegExp, 'Invalid phone number')
    .required('Field is required'),
  address: Yup.string().min(5).required('Address is required'),
  email: Yup.string().email('Must be a valid email').max(40).required('Email is required'),
  eid: Yup.string().required('Employee ID is required'),
});

export default addEmployeeSchema;
