import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { metadatProps, questionType } from "@/types/formtypes";
const initialState: questionType[] = [];

// const sortByPart = (a: any, b: any) => {
//   console.log(a, "=====", b);
//   return String(a.part).localeCompare(String(b.part), undefined, {
//     numeric: true,
//     sensitivity: "base",
//   });
// };

const sortByPart = (a: any, b: any) => {
  const partCompare = String(a.part).localeCompare(String(b.part), undefined, {
    numeric: true,
    sensitivity: "base",
  });

  if (partCompare !== 0) return partCompare;

  // optional tie-breaker (same part ke andar stable order)
  return String(a.section).localeCompare(String(b.section), undefined, {
    numeric: true,
    sensitivity: "base",
  });
};

const metaData = createSlice({
  name: "form-metadata",
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<questionType>) => {
      state.push(action.payload);
    },
    sortField: (state, action) => {
      return action.payload;
    },
    deleteField: (state, action) => {
      return state.filter((sec) => sec.section !== action.payload);
    },
    editSection: (state, action) => {
      const updated = state.map((d) =>
        d.id === action.payload.id
          ? { ...d, section: action.payload.section }
          : d,
      );

      return updated.sort(sortByPart);
    },

    editPart: (state, action) => {
      const updated = state.map((d) =>
        d.id === action.payload.id ? { ...d, part: action.payload.part } : d,
      );

      return updated.sort(sortByPart);
    },
  },
});

export const { addField, deleteField, editPart, editSection, sortField } =
  metaData.actions;
export default metaData.reducer;
