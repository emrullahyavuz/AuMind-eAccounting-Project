import { baseApi } from "./baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Products endpoints
    getAllProducts: builder.mutation({
        query: () => ({
          url: "/Products/GetAll",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }),
        providesTags: ["Products"],
      }),
  
      createProduct: builder.mutation({
        query: (productData) => ({
          url: "/Products/Create",
          method: "POST",
          body: productData,
        }),
        invalidatesTags: ["Products"],
      }),
  
      updateProduct: builder.mutation({
        query: (productData) => ({
          url: "/Products/Update",
          method: "POST",
          body: productData,
        }),
        invalidatesTags: ["Products"],
      }),
  
      deleteProduct: builder.mutation({
        query: (productId) => ({
          url: "/Products/DeleteById",
          method: "POST",
          body: { id: productId },
        }),
        invalidatesTags: ["Products"],
      }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllProductsMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
