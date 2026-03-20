import { FieldComponentProps } from "@/types/formtypes";
import React, { useState } from "react";

const Radio = ({
  dispatch,
  addQuestion,
  id,
  inputRef,
  baseInputClass,
  addOptions,
  question,
}: FieldComponentProps) => {
  const [optionValues, setOptionValues] = useState<string[]>([""]);
  const [options, setOptions] = useState<string[]>([
    crypto.randomUUID(),
    crypto.randomUUID(),
  ]);

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="text"
        onBlur={() =>
          dispatch(
            addQuestion({
              id: id,
              question: inputRef?.current?.value ?? "question",
            }),
          )
        }
        defaultValue={question}
        placeholder="SIngle Choice Questions "
        className={baseInputClass}
      />
      {options.map((o, i) => (
        <div
          key={o}
          className="flex max-w-[300px] w-full justify-between items-center"
        >
          <input
            type="text"
            value={optionValues[i] || ""}
            className={baseInputClass}
            placeholder={`Option ${i + 1}`}
            onChange={(e) => {
              const updated = [...optionValues];
              updated[i] = e.target.value;
              setOptionValues(updated);
            }}
            onBlur={() =>
              dispatch(addOptions({ id: id, option: optionValues[i] }))
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Radio;
