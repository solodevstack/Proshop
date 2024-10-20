import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url:`${USERS_URL}/auth`,
                method: "POST",
                 // Important: include credentials
                headers: {
                  'Content-Type': 'application/json',
                },
                body: data,
            })
          
            }),
            register: builder.mutation({
                query: (data) => ({
                    url: `${USERS_URL}`,
                    method: "POST",
                    body: data,
                    }),
                    }),

            logout: builder.mutation({
                query: () => ({
                    url: `${USERS_URL}/logout`,
                    method: "POST",
                    }),

    }),
    profile: builder.mutation({
        query: (data) => ({
            url: `${USERS_URL}/profile`,
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
              },
            body: data,
            })
            

    }),
    getUsers: builder.query({
        query: () => ({
            url: USERS_URL,
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
              },
    }),
    providesTags: ["Users"],
    keepUnusedDataFor: 4

    }),
    deleteUser: builder.mutation({
        query: (userId) => ({
            url: `${USERS_URL}/${userId}`,
            method: "DELETE",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
              },
              })
    }),
    getUserDetails: builder.query({
        query: (userId) => ({
            url: `${USERS_URL}/${userId}`,
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                },
                }),
                keepUnusedDataFor: 5
    }),
    updateUser: builder.mutation({
        query: (data) => ({
            url: `${USERS_URL}/${data.userId}`,
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                },
                body: data,
                }),
                invalidatesTags: ["User"]

    })



})
}); 
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation,useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation} = usersApiSlice;

