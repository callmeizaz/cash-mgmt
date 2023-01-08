import { RootState } from '../store';

export const selectCurrentUser = ({ auth }: RootState) => auth?.currentUser;
export const selectUserType = ({ auth }: RootState) => auth?.userType;
export const selectAuthLoading = ({ auth }: RootState) => auth?.loading;
