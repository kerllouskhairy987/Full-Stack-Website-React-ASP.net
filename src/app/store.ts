import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationsApiSlice } from "./api/ApiSlice/Applications";
import { ApiUserSlice } from "./api/ApiUsers/ApiUserSlice";
import { ApplicantsApiSlice } from "./api/ApiSlice/ApplicantsApiSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    [ApplicationsApiSlice.reducerPath]: ApplicationsApiSlice.reducer,
    [ApiUserSlice.reducerPath]: ApiUserSlice.reducer,
    [ApplicantsApiSlice.reducerPath]: ApplicantsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      ApplicationsApiSlice.middleware,
      ApiUserSlice.middleware,
      ApplicantsApiSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
