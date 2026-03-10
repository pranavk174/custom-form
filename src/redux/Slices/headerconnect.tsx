import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { metadatProps, questionType } from "@/types/formtypes";
import { groupTogether } from "@/helpers/function";
const initialState: questionType[] = [];

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
      return state.filter((sec) => sec.id !== action.payload);
    },
    addQuestion: (state, action) => {
      const { id, question } = action.payload;
      // const item = state.find((q) => q.id === id);
      const item = state.find((q) => {
        // console.log(q?.options, "q data.....");
        if (q.id === id) return q;
      });
      if (item) {
        item.question = question;
      }
    },
    addOptions: (state, action) => {
      const { id, option } = action.payload;

      const item = state.find((q) => q.id === id);

      if (item) {
        if (!item.options) {
          item.options = [];
        }
        item.options.push(option);
      }
    },
    editSection: (state, action) => {
      const updated = state.map((d) =>
        d.id === action.payload.id
          ? { ...d, section: action.payload.section }
          : d,
      );

      const arr = groupTogether(updated);
      return arr;
      // return updated.sort(sortByPart);
      // return updated;
    },
    editSectionImage: (state, action) => {
      // const updated = state.map((d) => {
      //   return d.part === action.payload.part &&
      //     d.section === action.payload.section
      //     ? { ...d, sectionImage: action.payload.sectionImage }
      //     : d;
      // });

      const index = state.findIndex(
        (d) =>
          d.part === action.payload.part &&
          d.section === action.payload.section,
      );

      if (index !== -1) {
        state[index].sectionImage = action.payload.sectionImage;
      }

      console.log(index, "index nhiu mila  ", state[index]);
      return state;
    },
    editPart: (state, action) => {
      const updated = state.map((d) =>
        d.id === action.payload.id ? { ...d, part: action.payload.part } : d,
      );

      const arr = groupTogether(updated);
      return arr;
      // return updated.sort(sortByPart);
      // return updated;
    },

    editType: (state, action) => {
      console.log(action.payload, "payload...");
      return state.map((d) =>
        d.id === action.payload.id ? { ...d, type: action.payload.type } : d,
      );
    },
    reorderFields: (state, action: PayloadAction<questionType[]>) => {
      return action.payload;
    },
  },
});

export const {
  addField,
  deleteField,
  editPart,
  editSection,
  sortField,
  editType,
  editSectionImage,
  addOptions,
  addQuestion,
  reorderFields,
} = metaData.actions;
export default metaData.reducer;
