'use client';

import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user/user-slice";
import { productsReducer } from "./features/products/products-slice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

