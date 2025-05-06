import { baseApi } from "./baseApi";

export const customerDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CustomerDetails endpoints
    getAllCustomerDetails: builder.mutation({
      query: (customerId) => ({
        url: "/CustomerDetails/GetAll",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId }),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllCustomerDetailsMutation } = customerDetailsApi;
