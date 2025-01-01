import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const schoolZonalApi = createApi({
  reducerPath: 'schoolZonalApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4600/zonals' }),
  endpoints: (builder) => ({
    getzonals: builder.query({
      query: () => `/`,
    }),
    addZonal : builder.mutation({
        query : (zonal) =>({
            url :'/addzonal',
            method : 'POST',
            body : zonal 
        })
    }),
    getComplaintsByBranch : builder.query({
      query : ()=>({
        url : '/complaintsbybranch',
        method : 'GET'
      })
    }),
    zonalLogin : builder.mutation({
       query : (zonal)=>({
         url : '/zonallogin',
         method : 'POST',
         body : zonal
       })
    }),
    // getComplaintsByZonal : builder.query({
    //   query: ({ branches, status, mobile }) => {
    //     const params = new URLSearchParams();
    //     if (branches?.length) params.append('branches', branches.join(','));
    //     if (status) params.append('status', status);
    //     if (mobile) params.append('mobile', mobile);

    //     const url = params.toString()
    //       ? `/zonalscomplaints?${params.toString()}`
    //       : '/zonalscomplaints';

    //     return {
    //       url,
    //       method: 'GET',
    //       headers: {
    //         'authorization': window.localStorage.getItem('token')
    //       },
    //     };
    //   },
    // })
    getComplaintsByZonal: builder.query({
      query: ({ branches, status, mobile }) => {
        const params = new URLSearchParams();
        if (branches?.length) params.append('branches', branches.join(','));
        if (status) params.append('status', status);
        if (mobile) params.append('mobile', mobile);

        const url = params.toString()
          ? `/zonalscomplaints?${params.toString()}`
          : '/zonalscomplaints';

        return {
          url,
          method: 'GET',
          headers: {
            'authorization': window.localStorage.getItem('token'),
          },
        };
      },
    }),
  }),
})

export const { useGetzonalsQuery,useAddZonalMutation,useGetComplaintsByBranchQuery,useZonalLoginMutation,useGetComplaintsByZonalQuery } = schoolZonalApi;