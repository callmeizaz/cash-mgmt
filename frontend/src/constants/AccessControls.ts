import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BadgeIcon from '@mui/icons-material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';

import { USER_TYPE_ADMIN, USER_TYPE_EMPLOYEE } from './AdminTypes';
import routes from './routes';

export const PAGE_NOT_FOUND = -2;
export const ACCESS_DENIED = -1;
export const DASHBOARD = 0;
export const BILL = 1;
export const BILL_LIST = 2;
export const LOGOUT = 3;
export const EMPLOYEE = 4;
export const ADD_EMPLOYEE = 5;

export const PROTECTED_PAGES = {
  PAGE_NOT_FOUND,
  ACCESS_DENIED,
  DASHBOARD,
  BILL,
  LOGOUT,
  EMPLOYEE,
  ADD_EMPLOYEE,
  BILL_LIST,
};

export const MENU_OPTIONS = [
  { label: 'Dashboard', value: DASHBOARD, icon: [DashboardIcon] },
  { label: 'Bill', value: BILL, icon: [DescriptionIcon] },
  { label: 'Bill List', value: BILL_LIST, icon: [DescriptionIcon] },
  { label: 'Add Employee', value: ADD_EMPLOYEE, icon: [BadgeIcon] },
  { label: 'Employees', value: EMPLOYEE, icon: [BadgeIcon] },
  { label: 'Logout', value: LOGOUT, icon: [LogoutIcon] },
];

export interface RestrictedProtectedRoutes {
  [key: string]: string[];
}

export const RESTRICTED_PROTECTED_ROUTES: RestrictedProtectedRoutes = {
  [USER_TYPE_ADMIN]: [],
  [USER_TYPE_EMPLOYEE]: [],
};

export interface RestrictedMenuOptions {
  [key: string]: number[];
}

export const RESTRICTED_MENU_OPTIONS: RestrictedMenuOptions = {
  [USER_TYPE_ADMIN]: [],
  [USER_TYPE_EMPLOYEE]: [5, 4],
};

export interface ProtectedRouteTabsPath {
  [key: string]: string;
}

export const PROTECTED_ROUTE_TABS_PATH: ProtectedRouteTabsPath = {
  [PAGE_NOT_FOUND]: routes.protected.pageNotFound,
  [ACCESS_DENIED]: routes.protected.accessDenied,
  [DASHBOARD]: routes.protected.dashboard,
  [BILL]: routes.protected.bill,
  [BILL_LIST]: routes.protected.billList,
  [EMPLOYEE]: routes.protected.employee,
  [ADD_EMPLOYEE]: routes.protected.addEmployee,
  [LOGOUT]: routes.protected.logout,
};

export interface TabHeaders {
  [key: string]: string;
}

export const TAB_HEADERS: TabHeaders = {
  [DASHBOARD]: 'Dashboard',
  [BILL]: 'Bill',
  [EMPLOYEE]: 'Employee',
  [ADD_EMPLOYEE]: 'Add Employee',
  [BILL_LIST]: 'Bill List',
};
