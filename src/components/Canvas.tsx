"use client";
import { useDroppable } from "@dnd-kit/core";
import HeaderConnector from "./HeaderConnector";
export default function Canvas({ fields, metaData, setMetaData }: any) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 border p-6 overflow-y-auto space-y-4 ${isOver ? "" : "bg-black"}`}
    >
      <h2 className="font-bold">Form Canvas</h2>

      {fields.map((field: any) => (
        <div key={field.id}>
          <HeaderConnector field={field} />
          <FieldPreview field={field} />
        </div>
      ))}
    </div>
  );
}

function FieldPreview({ field }: any) {
  switch (field.type) {
    case "text":
      return (
        <input
          disabled
          placeholder="Text field"
          className="border p-2 w-full"
        />
      );

    case "email":
      return (
        <input
          type="email"
          disabled
          placeholder="Email"
          className="border p-2 w-full"
        />
      );

    case "checkbox":
      return (
        <label className="flex gap-2">
          <input disabled type="checkbox" />
          Checkbox
        </label>
      );

    default:
      return null;
  }
}
