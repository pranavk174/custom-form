"use client";
import { useDraggable } from "@dnd-kit/core";

export default function DraggableItem({ id, label }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      type: 'sidebar-item',
      fieldType: id
    }
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="border p-2 cursor-grab bg-gray-100 text-black"
      suppressHydrationWarning
    >
      {label}
    </div>
  );
}
