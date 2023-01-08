import React, { useState } from 'react';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import {
  MENU_OPTIONS,
  RESTRICTED_MENU_OPTIONS,
  PROTECTED_ROUTE_TABS_PATH,
  TAB_HEADERS,
  LOGOUT,
  ProtectedRouteTabsPath,
  RestrictedMenuOptions,
  TabHeaders,
} from '../../constants/AccessControls';

import { selectCurrentUser } from '../../redux/selectors/authentication';
import { doLogout } from '../../redux/thunks/authentication';

import PrivateHeader from '../../components/Headers/PrivateHeader';
import AccessControlWrapper from '../../components/AccessControlWrapper';
import routes from '../../constants/routes';

const MuiTabs = styled(Tabs)({
  '&.MuiTabs-root': {
    padding: 0,
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
    justifyContent: "flex-start"
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

const ProtectedLayout = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [value, setValue] = useState(
    Number(
      Object.keys(PROTECTED_ROUTE_TABS_PATH).find(
        (key) => PROTECTED_ROUTE_TABS_PATH[key as keyof ProtectedRouteTabsPath] === pathname,
      ),
    ),
  );

  const theme = useTheme();
  const navigate = useNavigate();
  const classes = {
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      backgroundColor: '#F4F5F6',
      padding: '0 0 0 1rem',
    },
  };
  const currentUser = useSelector(selectCurrentUser);
  const role = currentUser?.userType || 'employee';

  const MENU_FILTER: number[] = RESTRICTED_MENU_OPTIONS[role as keyof RestrictedMenuOptions] || [];

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    navigate(PROTECTED_ROUTE_TABS_PATH[newValue as keyof ProtectedRouteTabsPath]);
    setValue(newValue);
  };

  const handleLogout = () => {
    dispatch(doLogout());
    navigate(routes.public.login);
  };

  return (
    <Grid container direction="row" justifyContent="center">
      <Grid
        item
        sm={3}
        md={3}
        lg={2}
        className="hidden min-h-screen sm:inline-block"
        sx={{
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Box className="flex items-center px-4 pt-6 pb-12 space-x-4">
          <MonetizationOnIcon sx={{ fontSize: '3rem', color: theme.palette.primary.main }} />
          <Typography className="font-semibold" sx={{ color: '#A4A6B3' }}>
            Cash Management
          </Typography>
        </Box>
        <MuiTabs
          orientation="vertical"
          variant="scrollable"
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
                  icon={<NavbarItemIcon/>}
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
                  icon={<NavbarItemIcon/>}
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
      <Grid item xs={12} sm={9} md={9} lg={10}>
        <PrivateHeader pageTitle={TAB_HEADERS[value as keyof TabHeaders]} />
        <TabPanel value={value} index={value}>
          <AccessControlWrapper />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default ProtectedLayout;
