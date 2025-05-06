import { baseApi } from "./baseApi";

export const cashRegistersDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all cash register details
    getAllCashRegisterDetails: builder.mutation({
      query: (cashRegisterId) => ({
        url: "/CashRegistersDetails/GetAll",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cashRegisterId }),
      }),
      providesTags: ["CashRegisterDetails"],
    }),

    // Create cash register detail
    createCashRegisterDetail: builder.mutation({
      query: (cashRegisterDetailData) => ({
        url: "/CashRegistersDetails/Create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cashRegisterDetailData),
      }),
      invalidatesTags: ["CashRegisterDetails"],
    }),

    // Update cash register detail
    updateCashRegisterDetail: builder.mutation({
      query: (cashRegisterDetailData) => ({
        url: "/CashRegistersDetails/Update",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cashRegisterDetailData),
      }),
      invalidatesTags: ["CashRegisterDetails"],
    }),

    // Delete cash register detail by ID
    deleteCashRegisterDetailById: builder.mutation({
      query: (id) => ({
        url: "/CashRegistersDetails/DeleteById",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }),
      invalidatesTags: ["CashRegisterDetails"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCashRegisterDetailsMutation,
  useCreateCashRegisterDetailMutation,
  useUpdateCashRegisterDetailMutation,
  useDeleteCashRegisterDetailByIdMutation,
} = cashRegistersDetailsApi;