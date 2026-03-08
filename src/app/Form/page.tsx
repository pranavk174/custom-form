"use client";

import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Canvas from "@/components/Canvas";
import { addField, reorderFields } from "@/redux/Slices/headerconnect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const data = useSelector((state: RootState) => state.metadata);
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState<string | null>(null);
  const router = useRouter();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Check if dragging item is from sidebar or canvas
    const isSidebarItem = active.data.current?.type === "sidebar-item";
    const isCanvasItem = active.data.current?.type === "canvas-item";

    // If it's a sidebar item, add new field
    if (isSidebarItem) {
      const type = active.data.current?.fieldType || (active.id as string);
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
      return;
    }

    // If it's a canvas item, reorder
    if (isCanvasItem) {
      const activeIndex = data.findIndex((item) => item.id === active.id);
      const overIndex = data.findIndex((item) => item.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
        const reordered = arrayMove(data, activeIndex, overIndex);
        dispatch(reorderFields(reordered));
      }
    }
  }

  const activeItem = data.find((item) => item.id === activeId);

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={data.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex  h-[95vh] gap-6 p-6">
            <Sidebar />
            <Canvas fields={data} />
          </div>
        </SortableContext>
        <DragOverlay>
          {activeItem ? (
            <div className="bg-gray-100 rounded-xl p-6 border-2 border-purple-500 shadow-lg opacity-80">
              <div className="text-gray-700 font-medium">
                {activeItem.type} field
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="bg-red-500 h-[5vh]">
        <Link
          href="/Response"
          // onClick={() => router.push("/Response")}
          className=""
        >
          Save
        </Link>
      </div>
    </div>
  );
}
