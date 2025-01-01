import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const schoolApi = createApi({
  reducerPath: 'schoolApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API}/branches` }),
  endpoints: (builder) => ({
    getbranches: builder.query({
      query: () => `/`,
    }),
    addBranch : builder.mutation({
        query : (branch) =>({
            url :'/addbranch',
            method : 'POST',
            body : branch
        })
    }),
    login : builder.mutation({
      query : (principal) =>({
          url : '/login',
          method : 'POST',
          body : principal
      })
    }),
    getcomplaintsBranch : builder.query({
      query : ({status,mobile})=>{
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (mobile) params.append('mobile', mobile);

        const url = params.toString()
          ? `/principalcomplaints?${params.toString()}`
          : '/principalcomplaints';

        return {
          url ,
          method : 'GET',
          headers : {
            'authorization' : window.localStorage.getItem('token')
          }
        }
      }
    }),
    deleteBranch : builder.mutation({
      query : (id) =>({
        url : `/deletebranch/${id}`,
        method : 'DELETE',
      })
    }),
    updatebranch : builder.mutation({
      query : ({id,updbranch})=>({
        url :`/updatebranch/${id}`,
        method : 'PUT',
        body : updbranch
      })
    })
  }),
})

export const { useGetbranchesQuery,useAddBranchMutation,useLoginMutation,useGetcomplaintsBranchQuery,useDeleteBranchMutation,useUpdatebranchMutation } = schoolApi;   