import routes from './routes';

export const PROTECTED_ROUTES = [
  routes.protected.home,
  routes.protected.dashboard,
  routes.protected.accessDenied,
  routes.protected.pageNotFound,
  routes.protected.bill,
  routes.protected.logout,
  routes.protected.employee,
  routes.protected.addEmployee,
  routes.protected.billList,
];

export const PUBLIC_ROUTES = [routes.public.login];
