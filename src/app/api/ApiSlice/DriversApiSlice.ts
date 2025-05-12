import { tokenFromLocalStorage } from "@/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = tokenFromLocalStorage;

export const DriversApiSlice = createApi({
  reducerPath: "DriversApiSlice",
  tagTypes: ["Drivers"],
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
    getDrivers: builder.query({
      query: () => "/Api/Drivers",
      providesTags: ["Drivers"],
    }),
  }),
});

export const { useGetDriversQuery } = DriversApiSlice;
