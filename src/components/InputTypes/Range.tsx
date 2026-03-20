import { FieldComponentProps } from "@/types/formtypes";
import React from "react";

const Range = ({
  inputRef,
  question,
  addQuestion,
  id,
}: FieldComponentProps) => {
  return (
    <input
      ref={inputRef}
      defaultValue={question}
      onBlur={() =>
        addQuestion({
          id: id,
          question: inputRef?.current?.value ?? "question",
        })
      }
      type="range"
      className="w-full"
    />
  );
};

export default Range;
