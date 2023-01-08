import * as Yup from 'yup';

const addBillSchema = Yup.object().shape({
  addedBy: Yup.string().max(255).required('Field is required'),
  amount: Yup.string().max(25).required('Amount is required'),
  billType: Yup.string().max(25).required('Field is required'),
});

export default addBillSchema;
