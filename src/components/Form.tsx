"use client";

import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Canvas from "@/components/Canvas";

export default function Home() {
  const [fields, setFields] = useState<any[]>([]);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over) return;

    console.log(active, "active.....");
    // active.id = dragged item type
    const type = active.id;

    const newField = {
      id: crypto.randomUUID(),
      type,
    };

    setFields((prev) => [...prev, newField]);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen gap-6 p-6">
        <Sidebar />
        <Canvas fields={fields} />
      </div>
    </DndContext>
  );
}
