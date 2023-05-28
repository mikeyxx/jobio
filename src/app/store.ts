import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import JobReducer from "../features/jobs/JobSlice";
import AuthReducer from "../features/auth/AuthSlice";

export const store = configureStore({
  reducer: {
    jobs: JobReducer,
    auth: AuthReducer,
  },
  // devTools: false,
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
