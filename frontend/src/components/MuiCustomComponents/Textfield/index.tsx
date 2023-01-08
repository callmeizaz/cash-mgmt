import React, { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const MuiTextField = ({ type, ...rest }: { type: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setType] = useState('password');
  const fieldProps = { type, ...rest };
  return type !== 'password' ? (
    <TextField {...fieldProps} />
  ) : (
    <TextField
      {...rest}
      type={inputType}
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
  );
};

export default MuiTextField;
