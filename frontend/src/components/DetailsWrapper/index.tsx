import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';

interface IProps {
  name: string;
  url: string;
  email?: string;
}

const UserDetailsWrapper = (props: IProps) => {
  const { url, name, email } = props;

  return (
    <Grid container alignItems="center">
      <Grid item xs={3} xl={2} className="mr-1">
        <Avatar src={url} sx={{ width: 46, height: 46 }} />
      </Grid>
      <Grid item container direction="column" xs={6}>
        <Grid item>
          <Typography>{name}</Typography>
        </Grid>
        <Grid item>
          <Typography className="text-xs text-custom-gray-400">{email}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserDetailsWrapper;
