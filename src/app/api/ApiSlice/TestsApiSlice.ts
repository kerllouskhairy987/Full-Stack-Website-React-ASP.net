import { tokenFromLocalStorage } from "@/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = tokenFromLocalStorage;

export const TestsApiSlice = createApi({
  reducerPath: "TestsApiSlice",
  tagTypes: ["Tests"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dvldweb.runasp.net",
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTests: builder.query({
      query: () => "/api/Tests",
      providesTags: ["Tests"],
    }),

    acceptTest : builder.mutation({
      query: ({data}) => ({
        url: `/api/Tests/TakeTest`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Tests"],
    }),

  }),
});

export const { useGetTestsQuery  , useAcceptTestMutation} = TestsApiSlice;
