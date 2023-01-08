import React, { Fragment } from 'react';

import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';

const Router = () => {
  return (
    <Fragment>
      <PublicRoutes />
      <ProtectedRoutes/>
    </Fragment>
  );
};

export default Router;
