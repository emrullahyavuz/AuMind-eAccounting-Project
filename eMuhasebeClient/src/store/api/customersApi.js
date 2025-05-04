import { baseApi } from "./baseApi";

export const customersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: () => ({
        url: "/Customers/GetAll",
        method: "POST",
      }),
    }),
    createCustomer: builder.mutation({
      query: (customerData) => ({
        url: "/Customers/Create",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: customerData,
      }),
    }),
    updateCustomer: builder.mutation({
      query: (customerData) => ({
        url: "/Customers/Update",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: customerData,
      }),
    }),
    deleteCustomer: builder.mutation({
      query: (customerId) => ({
        url: "/Customers/DeleteById",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { id: customerId },
      }),
    }),
    overrideExisting: false,
  }),
});

export const {
  useGetAllCustomersQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;
