import { baseApi } from './baseApi';

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInvoices: builder.query({
      query: () => ({
        url: '/Invoices/GetAll',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }),
    }),
    createInvoice: builder.mutation({
      query: (data) => ({
        url: '/Invoices/Create',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    }),
    updateInvoice: builder.mutation({
      query: (data) => ({
        url: '/Invoices/Update',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    }),
    deleteInvoice: builder.mutation({
      query: (invoiceIds) => ({
        url: '/Invoices/DeleteById',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id : invoiceIds }),
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllInvoicesQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;
