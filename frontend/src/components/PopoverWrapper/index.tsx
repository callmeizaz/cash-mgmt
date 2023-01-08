import React from 'react';
import { Popover } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '5px 0',
    borderRadius: '10px',
  },
}));

const PopoverWrapper = (props: any) => {
  const { anchorEl, handleClose, children, anchorPos } = props;
  const classes = useStyles();

  return (
    <Popover
      classes={{ paper: classes.root }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      className="rounded-lg"
      anchorOrigin={anchorPos}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {children}
    </Popover>
  );
};

export default PopoverWrapper;
