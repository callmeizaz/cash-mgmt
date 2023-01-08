import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

export const useStyles = makeStyles((theme: Theme) => ({
  boxShadow: {
    boxShadow:
      '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  textField: {
    fontSize: '14px !important',
    color: `${theme.palette?.primary?.light} !important`,
  },
  btn: {
    backgroundColor: '#F4F4F4 !important',
    '&:hover': {
      backgroundColor: '#F4F4F4 !important',
    },
  },
}));
