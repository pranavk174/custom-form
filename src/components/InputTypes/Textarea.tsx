import { FieldComponentProps } from "@/types/formtypes";
import React from "react";

const Textarea = ({
  textareaRef,
  question,
  addQuestion,
  id,
  baseInputClass,
}: FieldComponentProps) => {
  return (
    <div>
      <textarea
        ref={textareaRef}
        defaultValue={question}
        onBlur={() =>
          addQuestion({
            id: id,
            question: textareaRef?.current?.value ?? "question",
          })
        }
        placeholder="Textarea"
        className={`${baseInputClass} h-24 resize-none`}
      />
    </div>
  );
};

export default Textarea;
