"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import React, { ChangeEventHandler, useState } from "react";
import { questionType } from "@/types/formtypes";

export default function DynamicForm() {
  // const [formData, setFormData] = useState<any>({});
  const [rangeValue, setRangeValue] = useState(5);

  const data = useSelector((state: RootState) => state.metadata);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    // setFormData((prev: questionType) => ({
    //   ...prev,
    //   [name]:
    //     type === "checkbox" ? checked : type === "file" ? files?.[0] : value,
    // }));
  };

  const grouped = Object.groupBy(data, (user) => user.part);
  const final = Object.entries(grouped);

  console.log(data, "data....");
  const renderInput = (input: questionType) => {
    const name = input.type;
    const options = input.options;

    console.log(options, "options data....");
    const base =
      "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200";

    switch (input.type) {
      case "textarea":
        return (
          <textarea
            name={name}
            rows={4}
            // onChange={handleChange}
            className={base}
          />
        );

      case "select":
        return (
          <select name={name}
            // onChange={handleChange} 
            className={base}>
            {options?.map((op, i) => {
              console.log(op, "optionsss......");
              return (
                <option key={op.id} value={op.option}>
                  {op.option}
                </option>
              );
            })}
          </select>
        );

      case "radio":
        return (
          <div className="flex gap-6 pt-2">
            {options?.map((g) => (
              <label
                key={g.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={name}
                  value={g.option}
                  onChange={handleChange}
                />
                {g.option}
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <label className="flex items-center gap-3 pt-2 cursor-pointer">
            <input type="checkbox" name={name} onChange={handleChange} />
            Accept Terms & Conditions
          </label>
        );

      case "range":
        return (
          <div className="flex items-center gap-4 pt-2">
            <input
              type="range"
              min="0"
              max="10"
              value={rangeValue}
              onChange={(e) => setRangeValue(Number(e.target.value))}
              className="w-full"
            />
            <span className="font-semibold text-indigo-600">{rangeValue}</span>
          </div>
        );

      case "file":
        return (
          <input
            type="file"
            name={name}
            onChange={handleChange}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 cursor-pointer"
          />
        );

      default:
        return (
          <input
            type={input.type}
            name={name}
            onChange={handleChange}
            className={base}
          />
        );
    }
  };

  return (
    <div className=" bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex justify-center items-center ">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-white/50">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Dynamic Form Builder
        </h1>

        <form className="space-y-10">
          {final.map((p, idx) => {
            const d = p[1] ?? [];
            const sorted = Object.groupBy(d, (pu) => pu?.section);
            const done = Object.entries(sorted);

            console.log(d, "dd======");
            return (
              <div key={idx} className="space-y-6">
                <div className="border-b pb-3">
                  <h2 className="text-2xl font-bold text-indigo-600">
                    Part {p[0]}
                  </h2>
                </div>

                {done.map((iin) => (
                  <div
                    key={iin[0]}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                      Section {iin[0]}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      {iin[1]?.map((input) => (
                        <div key={input.id} className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-gray-600">
                            {input.question ?? input.type}
                          </label>

                          {renderInput(input)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          <button
            type="submit"
            className="w-full py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] transition-all shadow-lg"
          >
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
}
