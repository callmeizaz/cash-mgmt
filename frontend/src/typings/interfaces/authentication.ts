export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterEmployeePayload {
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  employeeId: string;
}
