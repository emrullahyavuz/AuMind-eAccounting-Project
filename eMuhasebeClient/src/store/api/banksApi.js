import { baseApi } from "./baseApi";

export const banksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Banks endpoints
    getAllBanks: builder.mutation({
        query: () => ({
          url: "/Banks/GetAll",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }),
      }),
  
      createBank: builder.mutation({
        query: (bankData) => ({
          url: "/Banks/Create",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bankData),
        }),
      }),
  
      updateBank: builder.mutation({
        query: (bankData) => ({
          url: "/Banks/Update",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bankData),
        }),
      }),
  
      deleteBank: builder.mutation({
        query: (bankId) => ({
          url: "/Banks/DeleteById",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: bankId }),
        }),
      }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllBanksMutation,
  useCreateBankMutation,
  useUpdateBankMutation,
  useDeleteBankMutation,
} = banksApi;
