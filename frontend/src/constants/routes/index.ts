import { include } from 'named-urls';

const routes = {
  public: include('/', {
    home: '',
    login: 'login',
  }),
  protected: include('/secured', {
    home: '',
    dashboard: 'dashboard',
    logout: 'logout',
    accessDenied: 'access-denied',
    pageNotFound: 'page-not-found',
    bill: 'bill',
    addEmployee: 'add',
    employee: 'employee',
    billList: 'bill/list',
  }),
};

export default routes;
