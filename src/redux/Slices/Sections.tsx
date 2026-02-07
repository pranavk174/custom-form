import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { metadatProps, questionType } from "@/types/formtypes";
const initialState: questionType[] = [];
const metaData = createSlice({
  name: "form-metadata",
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<questionType>) => {
      state.push(action.payload);
    },
    deleteField: (state, action) => {
      return state.filter((sec) => sec.section !== action.payload);
    },
  },
});

export const { addField, deleteField } = metaData.actions;
export default metaData.reducer;
