import { FieldComponentProps } from "@/types/formtypes";
import React from "react";

const Upload = ({
  inputRef,
  question,
  addQuestion,
  baseInputClass,
  id,
}: FieldComponentProps) => {
  return (
    <div>
      <input
        ref={inputRef}
        defaultValue={question}
        onBlur={() =>
          addQuestion({ id: id, question: inputRef?.current?.value ?? "" })
        }
        type="file"
        className={baseInputClass}
      />
    </div>
  );
};

export default Upload;
