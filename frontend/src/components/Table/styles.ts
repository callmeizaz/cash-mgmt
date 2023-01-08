import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

export const useStyles = makeStyles((theme: Theme) => ({
  header: {
    zIndex: 100,
  },
  body: {
    minHeight: '4.5rem !important',
    height: '4rem !important',
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
  },
  biggerTable: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
  },
}));
