"use client";
import { useDroppable } from "@dnd-kit/core";
import HeaderConnector from "./HeaderConnector";
import { groupProps, inputs, questionType } from "@/types/formtypes";
import FieldPreview from "./FieldPreview";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, UseDispatch } from "react-redux";
import { Pencil, Trash2, MoreVertical, ChevronRight } from "lucide-react";
import { deleteField, editType } from "@/redux/Slices/headerconnect";
import { useEffect } from "react";
export default function Canvas({ fields }: { fields: questionType[] }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  });

  console.log(fields, "fields");
  
  const grouped = fields.reduce<Record<number, typeof fields>>((acc, item) => {
    if (!acc[item.part]) {
      acc[item.part] = [];
    }
    acc[item.part].push(item);
    return acc;
  }, {});

  const dispatch = useDispatch();
  // console.log(grouped, "grouped....");
  const groupedArray = Object.entries(grouped).map(([part, items]) => ({
    part: Number(part),
    items,
  }));

  // console.log(groupedArray, "array");

  return (
    <div
      ref={setNodeRef}
      className={`flex-1  p-6 overflow-y-auto space-y-4  bg-black`}
    >
      <h2 className="font-bold">Form Canvas</h2>
      {groupedArray.map((files: groupProps, i: number) => {
        console.log(files, "field......");
        return (
          <div key={files.part}>
            {" "}
            {files.items.map((field: questionType, i: number) => {
              console.log(field, "field data.....");
              return (
                <div key={field.id}>
                  {" "}
                  <div
                    key={field.id}
                    className="relative rounded-xl p-4  shadow-sm space-y-4"
                  >
                    {/* <span className="text-white"> {i}</span> */}
                    <HeaderConnector
                      previous={files.items[i - 1]}
                      index={i}
                      field={field}
                    />
                    {i !== 0 && (
                      <div className="flex justify-center">
                        {" "}
                        <div className="h-[50px] w-[2px] border border-white border-dashed"></div>
                      </div>
                    )}
                    <div className="flex gap-3 items-center">
                      {/* <h4 className="font-semibold text-[25px]">{i}</h4> */}

                      <div className="w-full max-w-3xl mx-auto bg-gray-100 rounded-xl p-6 border border-gray-200">
                        {/* Top Row */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            {/* Number circle */}
                            <div className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 font-medium">
                              1
                            </div>

                            {/* Dropdown */}
                            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg  text-gray-600">
                              {/* <span className="capitalize">{field.type}</span>
                              <span className="text-sm rotate-90"> */}
                              <Select
                                defaultValue={field.type}
                                onValueChange={(value) => {
                                  dispatch(
                                    editType({
                                      id: field.id,
                                      type: value,
                                    }),
                                  );

                                  console.log(value, "value");
                                }}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {inputs.map((f, i) => {
                                      return (
                                        <SelectItem value={f.type} key={i}>
                                          {f.label}
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              {/* <ChevronRight /> */}
                            </div>
                          </div>

                          {/* Icons */}
                          <div className="flex items-center gap-4 text-gray-500">
                            <Pencil className="w-5 h-5 cursor-pointer hover:text-purple-500" />
                            <Trash2 onClick={()=>dispatch(deleteField(field.id))} className="w-5 h-5 cursor-pointer hover:text-red-500" />
                            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 cursor-pointer">
                              <MoreVertical className="w-5 h-5" />
                            </div>
                          </div>
                        </div>

                        {/* Question */}
                        <div className="mb-5">
                          <p className="text-gray-700 font-medium mb-2">
                            Question
                          </p>
                          {/* <input
                            type="text"
                            value="yes"
                            readOnly
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-600 outline-none"
                          /> */}
                          <FieldPreview field={field} />
                        </div>

                        {/* Description */}

                        {field.type !== "checkbox" && (
                          <div>
                            <p className="text-gray-700 font-medium mb-2">
                              Description (optional)
                            </p>
                            <textarea
                              placeholder="Add any extra instructions for the respondent"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-400 outline-none resize-none"
                              rows={3}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {i !== fields.length - 1 && (
                    <div className="flex justify-center">
                      {" "}
                      <div className="h-[50px] w-[2px] border border-dashed"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
