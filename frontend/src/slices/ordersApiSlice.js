import {apiSlice} from './apiSlice';
import { ORDERS_URL,PAYPAL_URL } from '../constants';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
          query: (order) => ({
            url: ORDERS_URL,
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: order
          }),
    }),
    
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: 'GET',
        credentials: 'include',
  
    }),
    
    keepUnusedDataFor: 5
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: details,
      }),
    }),
    
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
    }),
    keepUnusedDataFor: 5
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
       
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
       
    }),
    keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
       
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
       
    }),
    keepUnusedDataFor: 5,
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },

       
    }),
  })



})
})

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation,useGetPayPalClientIdQuery, useGetMyOrdersQuery, useGetOrdersQuery,useDeliverOrderMutation} = orderApiSlice