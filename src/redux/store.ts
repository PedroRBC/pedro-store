'use client';

import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./features/products/products-slice";
import { providersReducer } from "./features/providers/providers-slice";


export const store = configureStore({
    reducer: {
        products: productsReducer,
        providers: providersReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

