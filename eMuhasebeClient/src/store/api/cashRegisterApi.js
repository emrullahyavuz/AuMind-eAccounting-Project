import { baseApi } from "./baseApi";

export const cashRegisterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CashRegisters endpoints
    getAllCashRegisters: builder.mutation({
      query: () => ({
        url: "/CashRegisters/GetAll",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }),
    }),
    createCashRegister: builder.mutation({
      query: (cashRegisterData) => ({
        url: "/CashRegisters/Create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: cashRegisterData,
      }),
    }),
    updateCashRegister: builder.mutation({
      query: (cashRegisterData) => ({
        url: "/CashRegisters/Update",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: cashRegisterData,
      }),
    }),
    deleteCashRegister: builder.mutation({
      query: (cashRegisterId) => ({
        url: "/CashRegisters/DeleteById",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { id: cashRegisterId },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCashRegistersMutation,
  useCreateCashRegisterMutation,
  useUpdateCashRegisterMutation,
  useDeleteCashRegisterMutation,
} = cashRegisterApi;
