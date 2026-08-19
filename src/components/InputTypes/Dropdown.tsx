import { FieldComponentProps, optionProps } from "@/types/formtypes";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Dropdown = ({
  baseInputClass,
  addQuestion,
  dispatch,
  id,
  inputRef,
  option,
  addOptions,
  question = "question",
}: FieldComponentProps) => {
  const [options, setOptions] = useState<string[]>([crypto.randomUUID()]);
  const [optionValues, setOptionValues] = useState<optionProps[]>([]);

  console.log(option, "optionssss");
  return (
    <div>
      {" "}
      <div
        //  className="flex justify-between gap-3 items-center"
        className={` flex justify-between gap-3 items-center ${baseInputClass}`}
      >
        {" "}
        <input
          type="text"
          ref={inputRef}
          defaultValue={question}
          onBlur={() =>
            dispatch(
              addQuestion({
                id: id,
                question: inputRef?.current?.value ?? "question",
              }),
            )
          }
          placeholder={`Question`}
          className={` bg-white w-[90%] text-gray-600 outline-none`}
        />
        <span className="">
          {" "}
          <ChevronDown />{" "}
        </span>
      </div>
      {/* <select disabled className={baseInputClass}>
      <option>Select option</option>
    </select> */}
      <div className="space-y-3 mt-2">
        {options.map((o, i) => (
          <div
            key={o}
            className="flex max-w-[300px] w-full justify-between items-center"
          >
            <input
              type="text"
              value={optionValues[i].option || ""}
              className={baseInputClass}
              placeholder={`Option ${i + 1}`}
              onChange={(e) => {
                const updated = [...optionValues];
                console.log(updated, "updated...");
                updated[i].option = e.target.value;
                setOptionValues(updated);
              }}
              onBlur={() =>
                dispatch(
                  addOptions({ id: id, option: optionValues[i].option }),
                )
              }
            />

            <button
              disabled={options.length === 1}
              onClick={() => {
                setOptions((prev) => prev.filter((d) => d !== o));
              }}
            >
              <span className="text-red-600 p-2">X</span>
            </button>
          </div>
        ))}

        <button
          className="text-blue-400 cursor-pointer px-3 py-1 rounded-md"
          onClick={() => setOptions((prev) => [...prev, crypto.randomUUID()])}
        >
          Add Option
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
