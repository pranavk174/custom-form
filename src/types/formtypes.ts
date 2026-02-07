export interface questionType {
  question?: string;
  part: number | string;
  id: string;
  section: string;
  type: string;
  options?: string[];
  answers?: string;
}

export interface metadatProps {
  part: number | string;
  section: string;
}
