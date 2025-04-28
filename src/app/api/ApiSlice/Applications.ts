import { tokenFromLocalStorage } from "@/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = tokenFromLocalStorage;

export const ApplicationsApiSlice = createApi({
  reducerPath: "ApplicationsApiSlice",
  tagTypes: ["Applications"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://dvldweb.runasp.net",
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getApplications: builder.query({
      query: () => `/api/Applications`,
      providesTags: ["Applications"],
    }),
    acceptApplication: builder.mutation({
      query: (id) => ({
        url: `/api/Applications/Accept/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Applications"],
    }),
    rejectApplication: builder.mutation({
      query: (id) => ({
        url: `/api/Applications/Reject/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Applications"],
    }),
    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `/api/Applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applications"],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useAcceptApplicationMutation,
  useRejectApplicationMutation,
  useDeleteApplicationMutation,
} = ApplicationsApiSlice;
