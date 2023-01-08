import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import BillListComponent from '../components/BillList';
import EmployeeTableComponent from '../components/EmployeeList';

import FallbackLoader from '../components/FallbackLoader';
import Login from '../pages/Login';

const PublicRoutes = () => {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
