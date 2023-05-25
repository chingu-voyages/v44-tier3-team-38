import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import thunk, { ThunkMiddleware } from "redux-thunk";
import logger from "redux-logger";
import sessionReducer, { SessionState } from "./session";

interface RootState {
  session: SessionState;
}

const rootReducer = combineReducers({
  session: sessionReducer,
});

const middleware = [thunk as ThunkMiddleware<RootState>, logger];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;

export default store;
