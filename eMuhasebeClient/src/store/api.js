import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Company endpoints
    changeCompany: builder.mutation({
      query: (companyId) => ({
        url: '/auth/changeCompany',
        method: 'POST',
        body: { companyId },
      }),
    }),

    // Customer endpoints
    getCustomers: builder.query({
      query: () => '/customers',
    }),
    addCustomer: builder.mutation({
      query: (customer) => ({
        url: '/customers',
        method: 'POST',
        body: customer,
      }),
    }),

    // Product endpoints
    getProducts: builder.query({
      query: () => '/products',
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
    }),

    // Cash Register endpoints
    getCashRegisters: builder.query({
      query: () => '/cashRegisters',
    }),
    addCashRegister: builder.mutation({
      query: (cashRegister) => ({
        url: '/cashRegisters',
        method: 'POST',
        body: cashRegister,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useChangeCompanyMutation,
  useGetCustomersQuery,
  useAddCustomerMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useGetCashRegistersQuery,
  useAddCashRegisterMutation,
} = api;
