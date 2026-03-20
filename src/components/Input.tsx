import { FieldComponentProps } from "@/types/formtypes";
import React from "react";

const Input = ({
  inputRef,
  question,
  placeholder,
  baseInputClass,
  dispatch,
  addQuestion,
  id,
  // options = null,
}: FieldComponentProps) => {
  console.log(addQuestion, "add quetion", typeof addQuestion);
  return (
    <div>
      <input
        ref={inputRef}
        defaultValue={question}
        placeholder={placeholder}
        onBlur={() => {
          console.log("triggered....", inputRef?.current?.value, id);
          dispatch(
            addQuestion({ id: id, question: inputRef?.current?.value ?? "" }),
          );
        }}
        className={baseInputClass}
        // value={questions}
      />
    </div>
  );
};

export default Input;
