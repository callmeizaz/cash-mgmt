import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, matchPath, Outlet, Navigate } from 'react-router-dom';

import routes from '../../constants/routes';
import { selectCurrentUser, selectUserType } from '../../redux/selectors/authentication';
import { AUTH_REFRESH_TOKEN_CASH_MANAGEMENT_USER } from '../../constants/LocalStoragesKeys';
import { doLogout } from '../../redux/thunks/authentication';
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from '../../constants/AllRoutes';
import { RESTRICTED_PROTECTED_ROUTES } from '../../constants/AccessControls';

// public routes => any user can access like login page
// authenticated routes => only logged in user can access like dashboard page

const AccessControlWrapper = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const token = localStorage.getItem(AUTH_REFRESH_TOKEN_CASH_MANAGEMENT_USER);
  const userType = useSelector(selectUserType);
  const restrictedRoutes = RESTRICTED_PROTECTED_ROUTES[userType || 'employee'];
  const cannotAccess = !!restrictedRoutes.some((loc) => !!matchPath({ path: loc }, pathname));
  const protectedPageChecker = !!PROTECTED_ROUTES.some(
    (loc) => !!matchPath({ path: loc }, pathname),
  );

  return cannotAccess ? (
    <Navigate to={routes.protected.accessDenied} />
  ) : !cannotAccess && !protectedPageChecker ? (
    <Navigate to={routes.protected.pageNotFound} />
  ) : (
    <Outlet />
  );
};

export default AccessControlWrapper;
