import { baseApi } from "./baseApi";

export const generateInvoicePdfApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GenerateInvoicePdf endpoints
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
  }),
  overrideExisting: false,
});

export const { useGenerateInvoicePdfMutation } = generateInvoicePdfApi;
