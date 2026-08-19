import { addOptions, addQuestion } from "@/redux/Slices/headerconnect";
import { RootState } from "@/redux/store";

import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import Date from "./InputTypes/Date";
import Upload from "./InputTypes/Uload";
import Range from "./InputTypes/Range";
import Textarea from "./InputTypes/Textarea";
import Dropdown from "./InputTypes/Dropdown";
import Radio from "./InputTypes/Radio";
import { FieldComponentProps, optionProps, questionType } from "@/types/formtypes";
type Props = {
  field: questionType;
  question: string;
  option?: optionProps[];
};

const FieldPreview = ({ field, question, option }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const optionRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [options, setOptions] = useState<string[]>(
    field.type === "select"
      ? [crypto.randomUUID()]
      : [crypto.randomUUID(), crypto.randomUUID()],
  );

  const [optionValues, setOptionValues] = useState<optionProps[]>([]);
  const [questions, setQuestions] = useState(question);
  useEffect(() => {
    console.log(question, "options........", inputRef, option);
  }, []);
  const dispatch = useDispatch();
  const baseInputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-600 outline-none";

  const components: Record<string, React.ComponentType<FieldComponentProps>> = {
    text: Input,
    email: Input,
    password: Input,
    number: Input,
    tel: Input,
    url: Input,
    date: Input,
    file: Input,
    range: Input,
    textarea: Input,
    select: Dropdown,
    radio: Radio,
  };

  const Component = useMemo(() => components[field.type], [field.type]);

  if (!Component) return null;
  return (
    <Component
      field={field}
      id={field.id}
      question={question}
      option={option}
      inputRef={inputRef}
      textareaRef={textareaRef}
      optionRefs={optionRefs}
      options={options}
      addQuestion={addQuestion}
      addOptions={addOptions}
      setOptions={setOptions}
      optionValues={optionValues}
      setOptionValues={setOptionValues}
      placeholder={field.type}
      dispatch={dispatch}
      baseInputClass={baseInputClass}
    />
  );
};

export default React.memo(FieldPreview);
