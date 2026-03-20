import { FieldComponentProps } from "@/types/formtypes";
import React from "react";

const Date = ({
  inputRef,
  question,
  addQuestion,
  baseInputClass,
  id,
}: FieldComponentProps) => {
  return (
    <input
      ref={inputRef}
      defaultValue={question}
      onBlur={() =>
        addQuestion({ id: id, question: inputRef?.current?.value ?? "date" })
      }
      type="date"
      className={baseInputClass}
    />
  );
};

export default Date;
