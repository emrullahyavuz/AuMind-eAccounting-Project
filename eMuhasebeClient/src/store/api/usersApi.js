import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.mutation({
      query: () => ({
        url: '/Users/GetAll',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }),
      providesTags: ['Users'],
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: '/Users/Create',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: '/Users/Update',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: '/Users/DeleteById',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { id: userId },
      }),
      invalidatesTags: ['Users'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
