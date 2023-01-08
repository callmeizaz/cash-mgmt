import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { Box, Grid, IconButton, Typography, Tabs, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import routes from '../../constants/routes';
import {
  MENU_OPTIONS,
  RESTRICTED_MENU_OPTIONS,
  PROTECTED_ROUTE_TABS_PATH,
  LOGOUT,
  ProtectedRouteTabsPath,
  RestrictedMenuOptions,
} from '../../constants/AccessControls';

import { selectCurrentUser } from '../../redux/selectors/authentication';
import { doLogout } from '../../redux/thunks/authentication';

const MuiTabs = styled(Tabs)({
  '&.MuiTabs-root': {
    padding: 0,
    width: '100%',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#3E4049',
    color: `#DDE2FF`,
  },
});

const MuiTab = styled(Tab)({
  '&.MuiTab-root': {
    fontWeight: 'bold',
    fontSize: '0.8rem',
    backgroundColor: '#363740',
    color: `#A4A6B3`,
    justifyContent: 'flex-start',
  },
  '&.Mui-selected': {
    backgroundColor: '#3E4049',
    color: `#DDE2FF`,
    outline: 'none',
  },
  '&.MuiTab-wrapped': {
    // textTransform: 'none',
    // alignItems: 'flex-start',
    // padding: '12px 24px',
  },
});

const drawerWidth = '90vw';

const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

const PrivateSidebar = ({ isOpen, toggleDrawer }: { isOpen: boolean; toggleDrawer: Function }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = {
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      backgroundColor: '#F4F5F6',
      padding: '0 0 0 1rem',
    },
  };
  const { pathname } = useLocation();

  const [value, setValue] = useState(
    Number(
      Object.keys(PROTECTED_ROUTE_TABS_PATH).find(
        (key) => PROTECTED_ROUTE_TABS_PATH[key as keyof ProtectedRouteTabsPath] === pathname,
      ),
    ),
  );

  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const role = currentUser?.userType || 'employee';

  console.log(role);

  const MENU_FILTER: number[] = RESTRICTED_MENU_OPTIONS[role as keyof RestrictedMenuOptions] || [];

  console.log(MENU_FILTER);

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    navigate(PROTECTED_ROUTE_TABS_PATH[newValue as keyof ProtectedRouteTabsPath]);
    setValue(newValue);
    toggleDrawer(false);
  };

  const handleLogout = () => {
    dispatch(doLogout());
    navigate(routes.public.login);
  };

  return (
    <Drawer anchor={'left'} open={isOpen} onClose={() => toggleDrawer(false)}>
      <Box
        className="flex flex-col min-h-screen"
        sx={{
          backgroundColor: theme.palette?.secondary?.main,
        }}
      >
        <Box className="flex justify-end w-full pr-4 my-6" id="headernote">
          <IconButton onClick={() => toggleDrawer(false)} size="large">
            <CloseIcon sx={{ color: '#ffff' }} />
          </IconButton>
        </Box>
        <Grid container direction="column" className="pb-20" sx={{ width: drawerWidth }}>
          <Box className="flex items-center px-4 pt-6 pb-12 space-x-4">
            <MonetizationOnIcon sx={{ fontSize: '3rem', color: theme.palette.primary?.main }} />
            <Typography className="font-semibold" sx={{ color: '#A4A6B3' }}>
              Cash Management
            </Typography>
          </Box>
          <MuiTabs
            orientation="vertical"
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            sx={classes.tabs}
          >
            {MENU_OPTIONS.filter((opt) => !MENU_FILTER.includes(opt.value)).map(
              ({ label, value: val, icon }) => {
                const [NavbarItemIcon] = icon;
                return val === LOGOUT ? (
                  <MuiTab
                    key={val}
                    className="outline-none"
                    icon={<NavbarItemIcon />}
                    iconPosition="start"
                    label={label}
                    // id={`opt-${val}`}
                    value={val}
                    wrapped={true}
                    {...a11yProps(val)}
                    onClick={handleLogout}
                  />
                ) : (
                  <MuiTab
                    key={val}
                    className="outline-none"
                    icon={<NavbarItemIcon />}
                    iconPosition="start"
                    label={label}
                    // id={`opt-${val}`}
                    value={val}
                    wrapped={true}
                    {...a11yProps(val)}
                  />
                );
              },
            )}
          </MuiTabs>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default PrivateSidebar;
