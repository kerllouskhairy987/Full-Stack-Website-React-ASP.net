import { tokenFromLocalStorage } from "@/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = tokenFromLocalStorage;
export const LicenseApiSlice = createApi({
  reducerPath: "LicenseApiSlice",
  tagTypes: ["License"],
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
    getLicense: builder.query({
      query: () => "/Api/Licenses/GetAllLicenses",
      providesTags: ["License"],
    }),

    DetainLicense: builder.mutation({
      query: ({ data }) => ({
        url: `/Api/Licenses/DetainLicense`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["License"],
    }),
  }),
});

export const { useGetLicenseQuery, useDetainLicenseMutation } = LicenseApiSlice;
