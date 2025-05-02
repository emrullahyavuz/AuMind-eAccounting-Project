import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const customersApi = createApi({
  reducerPath: 'customersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5193/api",
  }),
  endpoints: (builder) => ({
    getAllCustomers: builder.mutation({
      query: () => ({
        url: '/Customers/GetAll',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({}),
        method: 'POST',
      }),
      providesTags: ['Customers'],
    }),
    createCustomer: builder.mutation({
      query: (customerData) => ({
        url: '/Customers/Create',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: customerData,
      }),
      invalidatesTags: ['Customers'],
    }),
    updateCustomer: builder.mutation({
      query: (customerData) => ({
        url: '/Customers/Update',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: customerData,
      }),
      invalidatesTags: ['Customers'],
    }),
    deleteCustomer: builder.mutation({
      query: (customerId) => ({
        url: '/Customers/DeleteById',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { id: customerId },
      }),
      invalidatesTags: ['Customers'],
    }),
    overrideExisting: false,
  }),
});

export const {
  useGetAllCustomersMutation,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;
