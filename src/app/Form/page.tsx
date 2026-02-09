"use client";

import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Canvas from "@/components/Canvas";
import { metadatProps, questionType } from "@/types/formtypes";
import { addField } from "@/redux/Slices/headerconnect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
export default function Home() {
  // const [fields, setFields] = useState<questionType[]>([]);

  const data = useSelector((state: RootState) => state.metadata);
  const [metaData, setMetaData] = useState<metadatProps>({
    section: "A",
    part: 1,
  });
  const dispatch = useDispatch();
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;

    // console.log(active, "active.....");
    // active.id = dragged item type
    const type = active.id;
    // console.log(data, "data==============");
    const section = data[data.length - 1]?.section ?? "A";
    const part = data[data.length - 1]?.part ?? 1;
    const order = data[data.length - 1]?.order
      ? data[data.length - 1]?.order + 1
      : 1;

    const newField = {
      id: crypto.randomUUID(),
      type,
      part: part,
      section: section,
      order: order,
    };
    dispatch(addField(newField));

    // setFields((prev) => [...prev, newField]);
  }

  // console.log(data, "fieldss");
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen gap-6 p-6">
        <Sidebar />
        <Canvas fields={data} />
      </div>
    </DndContext>
  );
}
