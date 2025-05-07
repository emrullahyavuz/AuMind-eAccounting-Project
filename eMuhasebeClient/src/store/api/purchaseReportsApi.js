import { baseApi } from "./baseApi";

export const purchaseReportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Reports endpoints
    getPurchaseReports: builder.query({
        query: () => ({
          url: "/Reports/PurchaseReports",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        providesTags: ["PurchaseReports"],
      }),
  
     
  }),
  overrideExisting: false,
});

export const {
  useGetPurchaseReportsQuery,
} = purchaseReportsApi;
