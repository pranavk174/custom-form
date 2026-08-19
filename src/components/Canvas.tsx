"use client";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import HeaderConnector from "./HeaderConnector";
import { groupProps, inputs, questionType } from "@/types/formtypes";
import FieldPreview from "./FieldPreview";

import { useDispatch, useSelector } from "react-redux";


import InputCard from "./InputCard";
import { RootState } from "@/redux/store";
import { useMemo } from "react";

function SortableFieldItem({
  field,
  index,
  previousField,
  isLast,
}: {
  field: questionType;
  index: number;
  previousField?: questionType;
  isLast: boolean;
}) {
  const dispatch = useDispatch();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id,
    data: {
      type: "canvas-item",
      field: field,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="relative rounded-xl p-4 shadow-sm space-y-4">
        <HeaderConnector previous={previousField} index={index} field={field} />
        {index !== 0 && (
          <div className="flex justify-center">
            <div className="h-[50px] w-[2px] border border-white border-dashed"></div>
          </div>
        )}
        <InputCard
          index={index}
          field={field}
          attributes={attributes}
          listeners={listeners}
        />


      </div>
      {!isLast && (
        <div className="flex justify-center">
          <div className="h-[50px] w-[2px] border border-dashed"></div>
        </div>
      )}
    </div>
  );
}

export default function Canvas({ fields }: { fields: questionType[] }) {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });


  const grouped = useMemo(() => {
    return fields.reduce<Record<number, typeof fields>>((acc, item) => {
      if (!acc[item.part]) {
        acc[item.part] = [];
      }
      acc[item.part].push(item);
      return acc;
    }, {})
  }, [fields]);

  const groupedArray = useMemo(() => {
    return Object.entries(grouped).map(([part, items]) => ({
      part: Number(part),
      items,
    }))
  }, [grouped]);

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-6 overflow-y-auto space-y-4 bg-black`}
    >
      <h2 className="font-bold">Form Canvas</h2>
      {groupedArray.map((group: groupProps) => {
        return (
          <div key={group.part}>
            {group.items.map((field: questionType, i: number) => (
              <SortableFieldItem
                key={field.id}
                field={field}
                index={i}

                previousField={group.items[i - 1]}
                isLast={i === group.items.length - 1}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
