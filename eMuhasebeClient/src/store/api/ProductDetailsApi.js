import { baseApi } from "./baseApi";

export const productDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ProductDetails endpoints
    getAllProductDetails: builder.mutation({
      query: (productId) => ({
        url: "/ProductDetails/GetAll",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }),
    }),
  }),
  overrideExisting: false,
});


export const { useGetAllProductDetailsMutation } = productDetailsApi;
