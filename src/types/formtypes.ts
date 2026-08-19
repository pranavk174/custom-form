import { Dispatch, SetStateAction, RefObject } from "react";
import { Action } from "@reduxjs/toolkit";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export interface questionType {
  question?: string;
  part: number;
  id: string;
  section: string;
  sectionImage?: null;
  type: string;
  options?: optionProps[];
  order: number;
  answer?: string;
}

export interface metadatProps {
  part: number | string;
  section: string;
}

export interface groupProps {
  part: number;
  items: questionType[];
}

export interface InputCardProps {
  index: number;
  field: questionType;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
}

export interface InputQestionProps {
  id: string;
  question: string;
}

export interface optionProps {
  id: string;
  option: string;
}

export const inputs = [
  { type: "text", label: "Text" },
  { type: "email", label: "Email" },
  { type: "password", label: "Password" },
  { type: "number", label: "Number" },
  { type: "tel", label: "Phone" },
  { type: "url", label: "URL" },
  { type: "date", label: "Date" },
  { type: "file", label: "File Upload" },
  { type: "range", label: "Range Slider" },
  { type: "textarea", label: "Textarea" },
  { type: "select", label: "Dropdown" },
  { type: "radio", label: "Radio Group" },
  { type: "checkbox", label: "Checkbox" },
] as const;

export interface FieldComponentProps {
  field: questionType;
  question: string;
  option?: optionProps[];
  id: string;
  inputRef: RefObject<HTMLInputElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  optionRefs: RefObject<(HTMLInputElement | null)[]>;
  placeholder?: string;
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
  options?: string[];
  // addOptions: Dispatch<SetStateAction<string[]>>;
  addOptions: (payload: optionProps) => Action;
  addQuestion: (payload: InputQestionProps) => Action;
  optionValues?: optionProps[];
  setOptionValues: Dispatch<SetStateAction<optionProps[]>>;
  // setOptionValues?: (payload: optionProps[]) => Action;

  dispatch: Dispatch<Action>;

  baseInputClass: string;
}
