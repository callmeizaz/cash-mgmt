import React from 'react';
import { Button as MUIButton, CircularProgress, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const WhiteCircularProgress = styled(CircularProgress)(() => ({
  '&.MuiCircularProgress-root': {
    color: 'white',
  },
}));

const DEFAULT_LOADER_SIZE = 30;

interface MUIButtonProps extends ButtonProps {
  loading?: boolean;
  loaderSize?: number;
  loader?: boolean;
}

const Button = ({
  children,
  loading = false,
  onClick = () => {},
  id = '',
  variant,
  loaderSize,
  color,
  loader,
  disabled = false,

  ...rest
}: MUIButtonProps) => {
  const load = loader ? (
    variant === 'contained' || !variant ? (
      <WhiteCircularProgress size={loaderSize || DEFAULT_LOADER_SIZE} />
    ) : (
      <CircularProgress
        size={loaderSize || DEFAULT_LOADER_SIZE}
        sx={{ color: color || 'rgba(170,126,80,1)' }}
      />
    )
  ) : (
    loader
  );

  return (
    <MUIButton id={id} onClick={!loading ? onClick : undefined} {...rest} disabled={loading}>
      {loading ? load : ""} {children}
    </MUIButton>
  );
};

export default Button;
