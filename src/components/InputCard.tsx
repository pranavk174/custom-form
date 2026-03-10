import React from "react";
import FieldPreview from "./FieldPreview";
import { GripVertical, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { editType, deleteField } from "@/redux/Slices/headerconnect";
import { inputs } from "@/types/formtypes";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const InputCard = ({ index, field, attributes, listeners }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-3 items-center">
      <div className="w-full max-w-3xl mx-auto bg-gray-100 rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* Drag Handle */}
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
            >
              <GripVertical className="w-5 h-5" />
            </div>

            <div className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 font-medium">
              {index + 1}
            </div>

            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg text-gray-600">
              <Select
                defaultValue={field.type}
                onValueChange={(value) => {
                  dispatch(
                    editType({
                      id: field.id,
                      type: value,
                    }),
                  );
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
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <Pencil className="w-5 h-5 cursor-pointer hover:text-purple-500" />
            <Trash2
              onClick={() => dispatch(deleteField(field.id))}
              className="w-5 h-5 cursor-pointer hover:text-red-500"
            />
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 cursor-pointer">
              <MoreVertical className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-gray-700 font-medium mb-2">Question</p>
          <FieldPreview
            question={field.question}
            options={field.option}
            field={field}
          />
        </div>

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
  );
};

export default InputCard;
