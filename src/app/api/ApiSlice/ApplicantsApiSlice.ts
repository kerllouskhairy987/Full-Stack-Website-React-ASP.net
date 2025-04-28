import { tokenFromLocalStorage } from "@/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = tokenFromLocalStorage;

export const ApplicantsApiSlice = createApi({
    reducerPath : "ApplicantsApiSlice",
    tagTypes :["Applicats"],
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
        getApplicants: builder.query({
            query: () => `/api/Applications`,
            providesTags: ["Applicats"],
          }),
          deleteApplicant: builder.mutation({
            query: (id) => ({
              url: `/api/Applicants/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: ["Applicats"],
          }),


      })
})

export const {useGetApplicantsQuery , useDeleteApplicantMutation} = ApplicantsApiSlice