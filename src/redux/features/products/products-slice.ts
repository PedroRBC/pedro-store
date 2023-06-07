'use client';

import { createSlice } from "@reduxjs/toolkit";

type Product = {
    id: number
    title: string
    price: string
    category: string
    description: string
    image: string
}

interface ProductState {
    products: Product[],
    loading: boolean,
}

const initialState: ProductState = {
    products: [],
    loading: true,
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getProducts: (state) => {
            return state;
        },
        fetchProducts: (state) => {
            state.loading = true;
            fetch('https://fakestoreapi.com/products')
                .then(res => res.json())
                .then(data => state.products = data)
                .catch(err => console.error(err))
                .finally(() => state.loading = false);
        }
    },
});

export const { getProducts, fetchProducts } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;