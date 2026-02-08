"use client";
import { useDroppable } from "@dnd-kit/core";
import HeaderConnector from "./HeaderConnector";
import { groupProps, questionType } from "@/types/formtypes";
import FieldPreview from "./FieldPreview";
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

  console.log(grouped, "grouped....");
  const groupedArray = Object.entries(grouped).map(([part, items]) => ({
    part: Number(part),
    items,
  }));

  console.log(groupedArray, "array");

  return (
    <div
      ref={setNodeRef}
      className={`flex-1  p-6 overflow-y-auto space-y-4 ${isOver ? "" : "bg-black"}`}
    >
      <h2 className="font-bold">Form Canvas</h2>

      {groupedArray.map((files: groupProps, i: number) => {
        console.log(files, "field......");
        return (
          <div key={files.part}>
            {" "}
            {files.items.map((field: questionType, i: number) => {
              return (
                <div key={field.id}>
                  {" "}
                  <div
                    key={field.id}
                    className="relative rounded-xl p-4 bg-neutral-secondary-soft shadow-sm space-y-4"
                  >
                    {/* <span className="text-white"> {i}</span> */}
                    <HeaderConnector index={i} field={field} />
                    {i !== 0 && (
                      <div className="flex justify-center">
                        {" "}
                        <div className="h-[50px] w-[2px] border border-dashed"></div>
                      </div>
                    )}
                    <div className="flex gap-3 items-center">
                      <h4 className="font-semibold text-[25px]">{i}</h4>
                      <FieldPreview field={field} />
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
