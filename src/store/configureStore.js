import { configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from './middleware/api'

export function configure() {
  return configureStore({
    reducer,
    middleware: [
       ...getDefaultMiddleware(),
       api
    ]
  });
}