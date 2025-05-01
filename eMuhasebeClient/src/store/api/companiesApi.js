import { baseApi } from './baseApi';

export const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: () => ({
        url: '/Companies/GetAll',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }),
      providesTags: ['Companies'],
    }),
    createCompany: builder.mutation({
      query: (company) => ({
        url: '/Companies/Create',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: company,
      }),
      invalidatesTags: ['Companies'],
    }),
    updateCompany: builder.mutation({
      query: (company) => ({
        url: '/Companies/Update',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: company,
      }),
      invalidatesTags: ['Companies'],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: '/Companies/DeleteById',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { id },
      }),
      invalidatesTags: ['Companies'],
    }),
    migrateAllCompanies: builder.mutation({
      query: () => ({
        url: '/Companies/MigrateAll',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }),
      invalidatesTags: ['Companies'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useMigrateAllCompaniesMutation,
} = companyApi;
