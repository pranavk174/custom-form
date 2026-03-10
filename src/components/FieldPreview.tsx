import { addOptions, addQuestion } from "@/redux/Slices/headerconnect";
import { RootState } from "@/redux/store";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
const FieldPreview = ({ field, question, option }: any) => {
  const [options, setOptions] = useState<string[]>(
    field.type === "select"
      ? [crypto.randomUUID()]
      : [crypto.randomUUID(), crypto.randomUUID()],
  );
  const [optionValues, setOptionValues] = useState<string[]>([""]);
  const [questions, setQuestions] = useState(question);
  console.log(question, "options........", option);
  const dispatch = useDispatch();
  const baseInputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-600 outline-none";

  switch (field.type) {
    case "text":
      return (
        <input
          onChange={(e) => setQuestions(e.target.value)}
          onBlur={() =>
            dispatch(addQuestion({ id: field.id, question: questions }))
          }
          placeholder="Text field"
          className={baseInputClass}
          value={questions}
        />
      );

    case "email":
      return (
        <input
          onChange={(e) => setQuestions(e.target.value)}
          onBlur={() =>
            dispatch(addQuestion({ id: field.id, question: questions }))
          }
          type="email"
          value={question}
          placeholder="Email"
          className={baseInputClass}
        />
      );

    case "password":
      return (
        <input
          type="password"
          value={question}
          placeholder="Password"
          onChange={(e) => setQuestions(e.target.value)}
          onBlur={() =>
            dispatch(addQuestion({ id: field.id, question: questions }))
          }
          className={baseInputClass}
        />
      );

    case "number":
      return (
        <input
          value={question}
          type="number"
          onChange={(e) => setQuestions(e.target.value)}
          onBlur={() =>
            dispatch(addQuestion({ id: field.id, question: questions }))
          }
          placeholder="Number"
          className={baseInputClass}
        />
      );

    case "tel":
      return (
        <input
          type="tel"
          onChange={(e) => setQuestions(e.target.value)}
          onBlur={() =>
            dispatch(addQuestion({ id: field.id, question: questions }))
          }
          value={question}
          placeholder="Phone number"
          className={baseInputClass}
        />
      );

    case "url":
      return (
        <input
          type="url"
          onChange={(e) => setQuestions(e.target.value)}
          onBlur={() =>
            dispatch(addQuestion({ id: field.id, question: questions }))
          }
          value={question}
          placeholder="Website URL"
          className={baseInputClass}
        />
      );

    case "date":
      return (
        <input
          onChange={(e) => setQuestions(e.target.value)}
          onBlur={() =>
            dispatch(addQuestion({ id: field.id, question: questions }))
          }
          value={question}
          type="date"
          className={baseInputClass}
        />
      );

    case "file":
      return (
        <input
          onChange={(e) => setQuestions(e.target.value)}
          onBlur={() =>
            dispatch(addQuestion({ id: field.id, question: questions }))
          }
          value={question}
          type="file"
          className={baseInputClass}
        />
      );

    case "range":
      return (
        <input
          onChange={(e) => setQuestions(e.target.value)}
          onBlur={() =>
            dispatch(addQuestion({ id: field.id, question: questions }))
          }
          value={question}
          type="range"
          className="w-full"
        />
      );

    case "textarea":
      return (
        <textarea
          onChange={(e) => setQuestions(e.target.value)}
          onBlur={() =>
            dispatch(addQuestion({ id: field.id, question: questions }))
          }
          value={question}
          placeholder="Textarea"
          className={`${baseInputClass} h-24 resize-none`}
        />
      );

    case "select": {
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
              value={question}
              onChange={(e) =>
                dispatch(
                  addQuestion({ id: field.id, question: e.target.value }),
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
                  value={optionValues[i] || ""}
                  className={baseInputClass}
                  placeholder={`Option ${i + 1}`}
                  onChange={(e) => {
                    const updated = [...optionValues];
                    updated[i] = e.target.value;
                    setOptionValues(updated);
                  }}
                  onBlur={() =>
                    dispatch(
                      addOptions({ id: field.id, option: optionValues[i] }),
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
              onClick={() =>
                setOptions((prev) => [...prev, crypto.randomUUID()])
              }
            >
              Add Option
            </button>
          </div>
        </div>
      );
    }
    case "radio":
      return (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            onChange={(e) =>
              dispatch(addQuestion({ id: field.id, question: e.target.value }))
            }
            value={question}
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
                  dispatch(
                    addOptions({ id: field.id, option: optionValues[i] }),
                  )
                }
              />
            </div>
          ))}
        </div>
      );

    case "checkbox":
      return (
        <label className="flex gap-2">
          <input type="checkbox" />
          Checkbox
        </label>
      );

    default:
      return null;
  }
};

export default FieldPreview;
