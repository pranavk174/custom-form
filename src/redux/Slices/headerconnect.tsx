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
    editSection: (state, action) => {
      return state.map((d) =>
        d.id === action.payload.id
          ? { ...d, section: action.payload.section }
          : d,
      );
    },
    editPart: (state, action) => {
      return state.map((d) =>
        d.id === action.payload.id ? { ...d, part: action.payload.part } : d,
      );
    },
  },
});

export const { addField, deleteField, editPart, editSection } =
  metaData.actions;
export default metaData.reducer;
