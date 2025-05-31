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
    generateInvoicePdf: builder.mutation({
      query: (invoiceId) => ({
        url: `/Invoices/GenerateInvoicePdf?invoiceId=${invoiceId}`,
        method: "GET",
        responseHandler: async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'PDF generation failed');
          }
          return response.blob();
        },
      }),
    }),
    extractText: builder.mutation({
      query: (data) => ({
        url: '/Invoices/ExtractText',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
  useGenerateInvoicePdfMutation,
  useExtractTextMutation,
} = invoiceApi;
