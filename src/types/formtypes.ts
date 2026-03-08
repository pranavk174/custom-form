export interface questionType {
  question: string;
  part: number;
  id: string;
  section: string;
  sectionImage?: null;
  type: string;
  options?: string[];
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
