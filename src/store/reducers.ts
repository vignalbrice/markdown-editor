import { appSlice } from "./app/slice";
import { combineReducers } from "redux";
import { markdownSlice } from "./markdown/slice";

const reducers = combineReducers({
  [markdownSlice.name]: markdownSlice.reducer,
  [appSlice.name]: appSlice.reducer,
});

export default reducers;
