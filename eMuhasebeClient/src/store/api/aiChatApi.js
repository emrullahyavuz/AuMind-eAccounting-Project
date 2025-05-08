import { baseApi } from './baseApi';

export const aiChatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatSummary: builder.mutation({
      query: (userPrompt) => ({
        url: '/AiChat/Summary',
        method: 'POST',
        body: {
          userPrompt,
        },
      }),
      transformResponse: (response) => {
        if (response.isSuccessful) {
          return response.data;
        }
        throw new Error(response.errorMessages?.join(', ') || 'Bir hata oluştu');
      },
    }),
  }),
});

export const { useGetChatSummaryMutation } = aiChatApi; 