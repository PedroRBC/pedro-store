'use client';

import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./features/products/products-slice";


export const store = configureStore({
    reducer: {
        products: productsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

