import { sortField } from "@/redux/Slices/headerconnect";

export const handleSetPart = (
  data: any,
  field: any,
  dispatch: any,
  editPart: any,
  value: any,
) => {
  const start: number = data.findIndex((item: any) => item.id === field.id);
  for (let i = start; i < data.length; i++) {
    if (data[i].part === field.part) {
      dispatch(editPart({ part: value, id: data[i].id }));
    }
  }
};

export const handleSetSection = (
  data: any,
  field: any,
  dispatch: any,
  editSection: any,
  value: any,
) => {
  const start: number = data.findIndex((item: any) => item.id === field.id);
  for (let i = start; i < data.length; i++) {
    if (data[i].part === field.part && data[i].section === field.section) {
      dispatch(editSection({ section: value, id: data[i].id }));
    }
  }
  const sorted = [...data].sort((a, b) =>
    String(a.part).localeCompare(String(b.part), undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
  console.log(sorted, "sorted......");
  // dispatch(sortField(sorted));
};

export const deletePart = (
  data: any,
  field: any,
  dispatch: any,
  editPart: any,
) => {
  const start: number = data.findIndex((item: any) => item.id === field.id);
  if (start === 0) return;
  for (let i = start; i < data.length; i++) {
    if (data[i].part === field.part) {
      dispatch(editPart({ part: data[start - 1].part, id: data[i].id }));
    }
  }
};

export const deleteSection = (
  data: any,
  field: any,
  dispatch: any,
  editSection: any,
) => {
  const start: number = data.findIndex((item: any) => item.id === field.id);
  if (start === 0) return;
  for (let i = start; i < data.length; i++) {
    if (data[i].part === field.part && data[i].section === field.section) {
      dispatch(
        editSection({ section: data[start - 1].section, id: data[i].id }),
      );
    }
  }
};
