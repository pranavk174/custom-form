"use client";
import DraggableItem from "./DraggableItem";
import { inputs } from "@/types/formtypes";
export default function Sidebar() {
  return (
    <div className="w-60 border p-4 space-y-4">
      <h2 className="font-bold">Components</h2>

      {inputs.length > 0 &&
        inputs.map((ini, k) => {
          return (
            <DraggableItem key={ini.type} id={ini.type} label={ini.label} />
          );
        })}
      {/* <DraggableItem id="text" label="Text Input" />
      <DraggableItem id="email" label="Email Input" />
      <DraggableItem id="checkbox" label="Checkbox" /> */}
    </div>
  );
}
