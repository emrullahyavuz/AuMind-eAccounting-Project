import { baseApi } from "./baseApi";

export const stockProfitabilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Reports endpoints
    getProductProfitabilityReports: builder.query({
        query: () => ({
          url: "/Reports/ProductProfitabilityReports",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }),
        providesTags: ["Reports"],
      }),
  
     
  }),
  overrideExisting: false,
});

export const {
  useGetProductProfitabilityReportsQuery,
} = stockProfitabilityApi;
