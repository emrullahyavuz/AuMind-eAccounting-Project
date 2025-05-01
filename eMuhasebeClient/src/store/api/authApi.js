import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    confirmEmail: builder.mutation({
      query: (data) => ({
        url: '/Auth/ConfirmEmail',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/Auth/Login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/Auth/Register',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    changeCompany: builder.mutation({
      query: (companyId) => ({
        url: '/auth/changeCompany',
        method: 'POST',
        body: { companyId },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangeCompanyMutation,
  useConfirmEmailMutation,
} = authApi;
