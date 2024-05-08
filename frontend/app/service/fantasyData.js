import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const fantasyDataApi = createApi({
  reducerPath: "fantasyDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/fantasy",
  }),
  endpoints: (builder) => ({
    // Get the Dream 11
    getDreamTeam: builder.query({
      query: () => "/dream11",
    }),

    //get suggested players
  }),
});

export const { useGetDreamTeamQuery } = fantasyDataApi;
