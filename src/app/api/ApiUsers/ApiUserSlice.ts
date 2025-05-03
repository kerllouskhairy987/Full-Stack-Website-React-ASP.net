import { tokenFromLocalStorage } from "@/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = tokenFromLocalStorage;
console.log(token);
export const ApiUserSlice = createApi({
  reducerPath: "ApiUserSlice",
  tagTypes: ["Users"],
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
    getAllUsers: builder.query({ query: () => `/Api/Users/GetAllUsers` }),
  }),
});

export const {useGetAllUsersQuery} = ApiUserSlice;
