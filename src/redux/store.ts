import { configureStore, Action } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        authState: authReducer,
    },
    middleware: (getDefaultMiddle) => getDefaultMiddle({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;