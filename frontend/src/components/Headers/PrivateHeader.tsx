import React, { Fragment, useState } from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';

import { selectCurrentUser } from '../../redux/selectors/authentication';

import PrivateSidebar from '../../components/Sidebars/PrivateSidebar';

interface PrivateHeaderProps {
  pageTitle: string;
}

const PrivateHeader = ({ pageTitle }: PrivateHeaderProps) => {
  const currentUser = useSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (val: boolean) => setIsOpen(val);
  return (
    <Fragment>
      <Box className="flex items-center px-8 mt-6 mb-10">
        <Box className="flex items-center w-1/2 space-x-2">
          <IconButton onClick={() => toggleDrawer(true)} className="inline sm:hidden">
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle2" component={'span'}>
            {pageTitle}
          </Typography>
        </Box>
        <Box className="flex items-center justify-end w-1/2 space-x-2">
          <Typography variant="label">
            {currentUser
              ? `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`
              : 'Jones Ferdinand'}
          </Typography>{' '}
          <Avatar>
            {currentUser
              ? `${currentUser?.firstName.charAt(0) || ''} ${currentUser?.lastName.charAt(0) || ''}`
              : ''}
          </Avatar>
        </Box>
      </Box>
      <PrivateSidebar isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </Fragment>
  );
};

export default PrivateHeader;
