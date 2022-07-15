/* eslint-disable eqeqeq */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, name } from "./constants";

export const markdownSlice = createSlice({
  name,
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addMarkdown: (state, action) => {
      const mdFound = state.markdowns.find((el) => el.id === action.payload.id);
      if (mdFound) return;
      state.markdowns = [...state.markdowns, action.payload];
      state.currentMd = action.payload;
    },
    selectMarkDown: (state, action) => {
      const mdFound = state.markdowns.find((el) => el.id === action.payload);
      if (mdFound) state.currentMd = mdFound;
    },
    emptyCurrentMarkdown: (state) => {
      state.currentMd = { id: "", createdAt: new Date(), name: "", text: "" };
    },
    setMarkDown: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const found = state.markdowns.find((x) => x.id == action.payload.id);
      if (!found) return;
      found.text = action.payload.text;
      state.currentMd.text = action.payload.text;
    },
    changeMarkdownName: (state, action) => {
      state.currentMd.name = action.payload;
      const found = state.markdowns.find((x) => x.id == action.payload.id);
      if (!found) return;
      found.name = action.payload.name;
      state.currentMd.name = action.payload.name;
    },
    deleteMarkdown: (state, action) => {
      state.markdowns = state.markdowns.filter(
        (el) => el.id !== action.payload
      );
    },
    setIsMarkDownFullScreen: (state, action) => {
      state.isMarkDownFullScreen = !action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});

export const {
  addMarkdown,
  setMarkDown,
  selectMarkDown,
  setIsMarkDownFullScreen,
  changeMarkdownName,
  deleteMarkdown,
  emptyCurrentMarkdown,
} = markdownSlice.actions;

export default markdownSlice.reducer;
