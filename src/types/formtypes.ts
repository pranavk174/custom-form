export interface questionType {
  question?: string;
  part: number ;
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

export interface groupProps {
  part : number ;
  items: questionType[]
}