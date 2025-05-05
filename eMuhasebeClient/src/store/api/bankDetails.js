import { baseApi } from "./baseApi";

export const bankDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // BankDetails endpoints
    getAllBankDetails: builder.mutation({
        query: (bankDetails) => ({
          url: "/BankDetails/GetAll",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...bankDetails}),
        }),
      }),
  
      createBankDetail: builder.mutation({
        query: (bankDetailData) => ({
          url: "/BankDetails/Create",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bankDetailData),
        }),
      }),
  
      updateBankDetail: builder.mutation({
        query: (bankDetailData) => ({
          url: "/BankDetails/Update",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bankDetailData),
        }),
      }),
  
      deleteBankDetail: builder.mutation({
        query: (bankDetailId) => ({
          url: "/BankDetails/DeleteById",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: bankDetailId }),
        }),
      }),
   
  }),
  overrideExisting: false,
});

export const {
  useGetAllBankDetailsMutation,
  useCreateBankDetailMutation,
  useUpdateBankDetailMutation,
  useDeleteBankDetailMutation,
} = bankDetailsApi;
