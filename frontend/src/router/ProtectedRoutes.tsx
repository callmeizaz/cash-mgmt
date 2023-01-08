import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import FallbackLoader from '../components/FallbackLoader';
import routes from '../constants/routes';
import ProtectedLayout from '../layouts/ProtectedLayout';
import AccessDenied from '../pages/AccessDenied';
import PageNotFound from '../pages/PageNotFound';
import BillForm from '../components/BillComponent';
import AddEmployeeComp from '../components/AddEmployee';
import EmployeeTableComponent from '../components/EmployeeList';
import BillListComponent from '../components/BillList';

const ProtectedRoutes = () => {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <Routes>
        <Route path={routes.protected.home} element={<ProtectedLayout />}>
          <Route path={routes.protected.dashboard} element={<>abc</>} />
          <Route path={routes.protected.bill} element={<BillForm />} />
          <Route path={routes.protected.addEmployee} element={<AddEmployeeComp />} />
          <Route path={routes.protected.accessDenied} element={<AccessDenied />} />
          <Route path={routes.protected.pageNotFound} element={<PageNotFound />} />
          <Route path={routes.protected.employee} element={<EmployeeTableComponent />} />
          <Route path={routes.protected.billList} element={<BillListComponent />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default ProtectedRoutes;
