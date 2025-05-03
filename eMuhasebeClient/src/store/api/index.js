import { authApi } from './authApi';
import { companyApi } from './companiesApi';
import { invoiceApi } from './invoicesApi';
import { userApi } from './usersApi';

export const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
};

export const apiMiddlewares = [
  authApi.middleware,
  companyApi.middleware,
  invoiceApi.middleware,
  userApi.middleware,
];
