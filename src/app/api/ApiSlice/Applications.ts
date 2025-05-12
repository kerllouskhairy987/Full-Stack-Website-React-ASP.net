import { tokenFromLocalStorage } from "@/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = tokenFromLocalStorage;

export const ApplicationsApiSlice = createApi({
  reducerPath: "ApplicationsApiSlice",
  tagTypes: ["Applications"],
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
    createLicense: builder.mutation({
      query: ({ data }) => ({
        url: `/Api/Licenses/IssueLicenseFirstTime`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Applications"],
    }),
    createLicenseInternational: builder.mutation({
      query: ({ data }) => ({
        url: `/Api/Licenses/IssueInternationalLicesnse`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Applications"],
    }),
    getRenewlicense: builder.query({
      query: () => "/api/Applications/GetAllRenewLicenseApps",
      providesTags: ["Applications"],
    }),
    acceptRenewLicense: builder.mutation({
      query: ({ data }) => ({
        url: `/Api/Licenses/RenewLicense`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Applications"],
    }),
    replaceForDamagedLicense: builder.mutation({
      query: ({ data }) => ({
        url: `/Api/Licenses/ReplaceForDamagedLicense`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Applications"],
    }),
    replaceForLostLicense: builder.mutation({
      query: ({ data }) => ({
        url: `/Api/Licenses/ReplaceForLostLicense`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Applications"],
    }),
    detainLicense: builder.mutation({
      query: ({ data }) => ({
        url: `/Api/Licenses/DetainLicense`,
        method: "POST",
        body: data,
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
  useCreateLicenseMutation,

  useCreateLicenseInternationalMutation,
  useGetRenewlicenseQuery,
  useAcceptRenewLicenseMutation,
  useReplaceForDamagedLicenseMutation,
  useReplaceForLostLicenseMutation,
  useDetainLicenseMutation,
} = ApplicationsApiSlice;
