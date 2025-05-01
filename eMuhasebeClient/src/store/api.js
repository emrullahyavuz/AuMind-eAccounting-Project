import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5193/api",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Auth endpoints
    confirmEmail: builder.mutation({
      query: (data) => ({
        url: "/Auth/ConfirmEmail",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/Auth/Login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/Auth/Register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    changeCompany: builder.mutation({
      query: (companyId) => ({
        url: "/auth/changeCompany",
        method: "POST",
        body: { companyId },
      }),
    }),

    // Invoice endpoints
    getAllInvoices: builder.query({
      query: () => ({
        url: "/Invoices/GetAll",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }),
    }),

    createInvoice: builder.mutation({
      query: (invoiceData) => ({
        url: "/Invoices/Create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      }),
    }),

    updateInvoice: builder.mutation({
      query: (invoiceData) => ({
        url: "/Invoices/Update",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      }),
    }),

    deleteInvoice: builder.mutation({
      query: (invoiceIds) => ({
        url: "/Invoices/Delete",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: invoiceIds }),
      }),
    }),

    // Companies endpoints
    getAllCompanies: builder.query({
      query: () => ({
        url: "/Companies/GetAll",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }),
      providesTags: ["Companies"],
    }),

    createCompany: builder.mutation({
      query: (company) => ({
        url: "/Companies/Create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: company,
      }),
      invalidatesTags: ["Companies"],
    }),

    updateCompany: builder.mutation({
      query: (company) => ({
        url: "/Companies/Update",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: company,
      }),
      invalidatesTags: ["Companies"],
    }),

    deleteCompany: builder.mutation({
      query: (companyId) => ({
        url: "/Companies/DeleteById",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { id: companyId },
      }),
      invalidatesTags: ["Companies"],
    }),

    migrateAllCompanies: builder.mutation({
      query: () => ({
        url: "/Companies/MigrateAll",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }),
      invalidatesTags: ["Companies"],
    }),

    // Users endpoints
    getAllUsers: builder.mutation({
      query: () => ({
        url: "/Users/GetAll",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }),
      providesTags: ["Users"],
    }),

    createUser: builder.mutation({
      query: (userData) => ({
        url: "/Users/Create",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/Users/Update",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),
    
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: "/Users/DeleteById",
        method: "POST",
        body: { id: userId },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});
// Export hooks for usage in components
export const {
  useLoginMutation,
  useRegisterMutation,
  useChangeCompanyMutation,
  useGetCustomersQuery,
  useAddCustomerMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useGetCashRegistersQuery,
  useAddCashRegisterMutation,
  useGetAllUsersMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useConfirmEmailMutation,
  useGetAllCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useMigrateAllCompaniesMutation,
  useGetAllInvoicesQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = api;
