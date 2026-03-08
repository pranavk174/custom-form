# Drag and Drop Sorting - Complete Documentation

## Overview

Is project mein drag and drop functionality implement ki gayi hai jo do main features provide karti hai:

1. **Sidebar se Canvas pe new fields add karna** (drag from sidebar to canvas)
2. **Canvas pe existing fields ko reorder karna** (sorting within canvas)

---

## Technologies Used

### 1. @dnd-kit Library

- **@dnd-kit/core** - Core drag and drop functionality
- **@dnd-kit/sortable** - Sortable list functionality
- **@dnd-kit/utilities** - Helper utilities (CSS transforms)

### Installation

```bash
npm install @dnd-kit/sortable
```

---

## Architecture & Implementation

### 1. Redux State Management

**File:** `src/redux/Slices/headerconnect.tsx`

#### New Action Added: `reorderFields`

```typescript
reorderFields: (state, action: PayloadAction<questionType[]>) => {
  return action.payload;
};
```

**Purpose:** Jab user canvas pe fields ko drag karke reorder karta hai, to ye action pure array ko update kar deta hai.

**Export:**

```typescript
export const {
  addField,
  deleteField,
  editPart,
  editSection,
  sortField,
  editType,
  editSectionImage,
  reorderFields, // ← New action
} = metaData.actions;
```

---

### 2. Sidebar Items (Draggable Components)

**File:** `src/components/DraggableItem.tsx`

#### Key Changes:

```typescript
const { attributes, listeners, setNodeRef, transform } = useDraggable({
  id,
  data: {
    type: "sidebar-item", // ← Identifies this as sidebar item
    fieldType: id, // ← Stores the field type (text, email, etc.)
  },
});
```

**Purpose:**

- `data.type = 'sidebar-item'` se hum identify kar sakte hain ki drag sidebar se ho raha hai
- `data.fieldType` mein actual field type store hota hai (text, email, checkbox, etc.)

**Visual Behavior:**

- Cursor: `cursor-grab` (hand icon)
- Transform: Item drag karte waqt move hota hai

---

### 3. Canvas Component (Sortable Fields)

**File:** `src/components/Canvas.tsx`

#### A. SortableFieldItem Component

Ye ek internal component hai jo har individual field ko sortable banata hai.

```typescript
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
      type: 'canvas-item',     // ← Identifies this as canvas item
      field: field             // ← Stores complete field data
    }
  });
```

**Key Features:**

1. **Drag Handle (GripVertical Icon)**

```typescript
<div
  {...attributes}
  {...listeners}
  className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
>
  <GripVertical className="w-5 h-5" />
</div>
```

- Sirf is icon ko pakad ke hi drag kar sakte ho
- `cursor-grab` → normal state
- `cursor-grabbing` → dragging state

2. **Visual Feedback During Drag**

```typescript
const style = {
  transform: CSS.Transform.toString(transform),
  transition,
  opacity: isDragging ? 0.5 : 1, // ← Dragging pe opacity kam ho jati hai
};
```

3. **Data Property**

- `type: 'canvas-item'` se identify hota hai ki ye canvas ka item hai
- Sidebar items se distinguish karne ke liye zaroori hai

#### B. Main Canvas Component

```typescript
export default function Canvas({ fields }: { fields: questionType[] }) {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  // Fields ko part ke basis pe group karna
  const grouped = fields.reduce<Record<number, typeof fields>>((acc, item) => {
    if (!acc[item.part]) {
      acc[item.part] = [];
    }
    acc[item.part].push(item);
    return acc;
  }, {});

  const groupedArray = Object.entries(grouped).map(([part, items]) => ({
    part: Number(part),
    items,
  }));

  return (
    <div ref={setNodeRef} className="flex-1 p-6 overflow-y-auto space-y-4 bg-black">
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
```

**Purpose:**

- `useDroppable` se canvas ek drop zone ban jata hai
- Fields ko parts mein group karke display karta hai
- Har field ko `SortableFieldItem` component ke through render karta hai

---

### 4. Main Form Page (DndContext Setup)

**File:** `src/app/Form/page.tsx`

#### A. Sensors Configuration

```typescript
const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8, // ← 8px move karne ke baad hi drag start hoga
    },
  }),
);
```

**Purpose:**

- Accidental drags ko prevent karta hai
- User ko 8 pixels move karna padta hai tab drag activate hota hai
- Click aur drag mein differentiate karne ke liye

#### B. Drag State Management

```typescript
const [activeId, setActiveId] = useState<string | null>(null);

function handleDragStart(event: DragStartEvent) {
  setActiveId(event.active.id as string);
}
```

**Purpose:**

- Track karta hai ki currently kaunsa item drag ho raha hai
- DragOverlay mein preview dikhane ke liye use hota hai

#### C. Drag End Handler (Main Logic)

```typescript
function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  setActiveId(null);

  if (!over) return; // Agar kisi valid drop zone pe nahi chhoda to return

  // Check if dragging item is from sidebar or canvas
  const isSidebarItem = active.data.current?.type === "sidebar-item";
  const isCanvasItem = active.data.current?.type === "canvas-item";

  // CASE 1: Sidebar se new field add karna
  if (isSidebarItem) {
    const type = active.data.current?.fieldType || (active.id as string);
    const section = data[data.length - 1]?.section ?? "A";
    const part = data[data.length - 1]?.part ?? 1;
    const order = data[data.length - 1]?.order
      ? data[data.length - 1]?.order + 1
      : 1;

    const newField = {
      id: crypto.randomUUID(), // Unique ID generate karna
      type,
      part: part,
      section: section,
      order: order,
    };
    dispatch(addField(newField));
    return;
  }

  // CASE 2: Canvas items ko reorder karna
  if (isCanvasItem) {
    const activeIndex = data.findIndex((item) => item.id === active.id);
    const overIndex = data.findIndex((item) => item.id === over.id);

    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      const reordered = arrayMove(data, activeIndex, overIndex);
      dispatch(reorderFields(reordered));
    }
  }
}
```

**Logic Breakdown:**

1. **Sidebar Item Detection:**
   - `active.data.current?.type === 'sidebar-item'` check karta hai
   - Agar true hai to new field create karke Redux store mein add karta hai
   - Last field ke metadata (section, part, order) ko use karke new field banata hai

2. **Canvas Item Detection:**
   - `active.data.current?.type === 'canvas-item'` check karta hai
   - Agar true hai to `arrayMove` utility use karke array reorder karta hai
   - `reorderFields` action dispatch karke Redux store update karta hai

3. **Edge Cases:**
   - Agar `over` null hai (valid drop zone pe nahi chhoda) to kuch nahi hota
   - Agar same position pe drop kiya to reorder nahi hota
   - Agar beech mein drag cancel ho jaye to kuch nahi hota

#### D. DndContext Setup

```typescript
return (
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
      <div className="flex h-screen gap-6 p-6">
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
);
```

**Components Explained:**

1. **DndContext:**
   - Sabse parent component
   - Drag and drop functionality provide karta hai
   - `collisionDetection={closestCenter}` - closest item detect karta hai

2. **SortableContext:**
   - Canvas items ko sortable banata hai
   - `items` prop mein all field IDs pass karte hain
   - `verticalListSortingStrategy` - vertical sorting ke liye

3. **DragOverlay:**
   - Drag karte waqt ek floating preview dikhata hai
   - Original item ki jagah ye preview move hota hai
   - Better UX provide karta hai

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        DndContext                            │
│  (Main drag and drop provider)                              │
│                                                              │
│  ┌────────────────┐              ┌─────────────────────┐   │
│  │   Sidebar      │              │      Canvas         │   │
│  │                │              │                     │   │
│  │ ┌────────────┐ │              │ ┌─────────────────┐│   │
│  │ │Draggable   │ │   Drag       │ │ SortableField  ││   │
│  │ │Item        │ │─────────────>│ │ Item           ││   │
│  │ │(text)      │ │   & Drop     │ │                ││   │
│  │ └────────────┘ │              │ └─────────────────┘│   │
│  │                │              │                     │   │
│  │ ┌────────────┐ │              │ ┌─────────────────┐│   │
│  │ │Draggable   │ │              │ │ SortableField  ││   │
│  │ │Item        │ │              │ │ Item           ││   │
│  │ │(email)     │ │              │ │                ││   │
│  │ └────────────┘ │              │ └─────────────────┘│   │
│  └────────────────┘              └─────────────────────┘   │
│                                                              │
│         data: {                         data: {             │
│           type: 'sidebar-item'            type: 'canvas-item'│
│           fieldType: 'text'               field: {...}      │
│         }                                 }                  │
│                                                              │
│                    handleDragEnd()                          │
│                          │                                   │
│                          ▼                                   │
│              ┌───────────────────────┐                      │
│              │  Check data.type      │                      │
│              └───────────────────────┘                      │
│                     │         │                              │
│         ┌───────────┘         └──────────┐                 │
│         ▼                                 ▼                  │
│  sidebar-item?                     canvas-item?             │
│         │                                 │                  │
│         ▼                                 ▼                  │
│  dispatch(addField)              dispatch(reorderFields)    │
│         │                                 │                  │
│         └─────────────┬───────────────────┘                 │
│                       ▼                                      │
│                 Redux Store                                  │
│                       │                                      │
│                       ▼                                      │
│                Canvas Re-renders                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Concepts

### 1. Data Property ka Use

Har draggable item mein `data` property hoti hai jo identify karne mein help karti hai:

```typescript
// Sidebar Item
data: {
  type: 'sidebar-item',
  fieldType: 'text'
}

// Canvas Item
data: {
  type: 'canvas-item',
  field: { id: '123', type: 'text', ... }
}
```

### 2. arrayMove Utility

```typescript
import { arrayMove } from "@dnd-kit/sortable";

// Example:
const arr = ["a", "b", "c", "d"];
const result = arrayMove(arr, 1, 3); // Move 'b' to position 3
// Result: ['a', 'c', 'd', 'b']
```

### 3. Collision Detection

```typescript
collisionDetection = { closestCenter };
```

- Ye determine karta hai ki drag karte waqt kaunsa item "over" hai
- `closestCenter` - center point ke basis pe closest item detect karta hai
- Other options: `closestCorners`, `pointerWithin`, `rectIntersection`

### 4. Sensors

```typescript
useSensor(PointerSensor, {
  activationConstraint: {
    distance: 8,
  },
});
```

- Mouse/touch events ko handle karta hai
- `distance: 8` - 8px move karne ke baad drag activate hota hai
- Accidental clicks ko prevent karta hai

---

## Bug Fixes Applied

### Problem 1: Extra Components Add Ho Rahe The

**Issue:** Jab canvas items ko drag karke beech mein chhod dete the, to extra field add ho jata tha.

**Root Cause:** Sidebar items aur canvas items mein differentiation nahi tha. `handleDragEnd` mein dono cases ko same treat kar raha tha.

**Solution:**

1. Sidebar items mein `data.type = 'sidebar-item'` add kiya
2. Canvas items mein `data.type = 'canvas-item'` add kiya
3. `handleDragEnd` mein proper checks lagaye:

```typescript
const isSidebarItem = active.data.current?.type === "sidebar-item";
const isCanvasItem = active.data.current?.type === "canvas-item";
```

### Problem 2: Drag Properly Kaam Nahi Kar Raha Tha

**Issue:** Drag karte waqt items properly move nahi ho rahe the.

**Root Cause:**

- Nested `SortableContext` conflicts create kar raha tha
- Collision detection properly configure nahi tha
- Sensors missing the

**Solution:**

1. Parent level pe single `SortableContext` use kiya
2. `closestCenter` collision detection add kiya
3. `PointerSensor` with activation constraint add kiya
4. `DragOverlay` add kiya for better visual feedback

---

## User Experience Features

### 1. Visual Feedback

- **Drag Handle:** GripVertical icon (⋮⋮) clearly indicates draggable area
- **Cursor Changes:**
  - `cursor-grab` → normal state
  - `cursor-grabbing` → dragging state
- **Opacity:** Dragging item ka opacity 0.5 ho jata hai
- **DragOverlay:** Floating preview dikhta hai

### 2. Smooth Animations

- CSS transforms use hote hain for smooth movement
- Transition property se animated reordering hoti hai

### 3. Accidental Drag Prevention

- 8px activation distance se accidental drags prevent hote hain
- Click aur drag properly differentiate hote hain

---

## Testing Checklist

✅ **Sidebar to Canvas:**

- [ ] Sidebar se field drag karke canvas pe drop karo
- [ ] New field add hona chahiye
- [ ] Field last position pe add hona chahiye

✅ **Canvas Reordering:**

- [ ] Canvas pe existing field ko drag karo
- [ ] Dusre field ke upar/neeche drop karo
- [ ] Fields reorder hone chahiye

✅ **Edge Cases:**

- [ ] Drag start karke beech mein cancel karo (ESC press karo)
- [ ] Kuch nahi hona chahiye
- [ ] Same position pe drop karo
- [ ] Koi change nahi hona chahiye

✅ **Visual Feedback:**

- [ ] Drag handle hover pe color change hona chahiye
- [ ] Dragging pe opacity kam honi chahiye
- [ ] DragOverlay preview dikhna chahiye

---

## Future Enhancements

### 1. Multi-Part Sorting

Currently fields sirf ek flat list mein sort hote hain. Future mein:

- Different parts ke beech drag and drop
- Part boundaries ko respect karna
- Section-wise sorting

### 2. Undo/Redo

- Reorder operations ko undo/redo karna
- Redux middleware use karke history maintain karna

### 3. Keyboard Support

- Arrow keys se reordering
- Accessibility improvements
- Screen reader support

### 4. Drag Constraints

- Certain fields ko lock karna (non-draggable)
- Conditional dragging based on field type
- Permission-based drag restrictions

---

## Troubleshooting

### Issue: Drag nahi ho raha

**Check:**

1. `@dnd-kit/sortable` install hai?
2. `DndContext` properly wrap hai?
3. `sensors` configure hain?

### Issue: Extra fields add ho rahe hain

**Check:**

1. `data.type` property set hai sidebar aur canvas items mein?
2. `handleDragEnd` mein proper checks hain?

### Issue: Reordering kaam nahi kar raha

**Check:**

1. `SortableContext` mein `items` prop sahi hai?
2. `reorderFields` action Redux mein hai?
3. Field IDs unique hain?

---

## Code References

### Important Files:

1. `src/app/Form/page.tsx` - Main DndContext setup
2. `src/components/Canvas.tsx` - Sortable fields
3. `src/components/DraggableItem.tsx` - Sidebar items
4. `src/redux/Slices/headerconnect.tsx` - Redux actions

### Key Functions:

- `handleDragEnd()` - Main drag logic
- `handleDragStart()` - Track active item
- `arrayMove()` - Reorder array utility
- `reorderFields()` - Redux action

---

## Summary

Is implementation mein:

1. ✅ Sidebar se canvas pe drag and drop
2. ✅ Canvas pe fields ko reorder karna
3. ✅ Visual feedback aur smooth animations
4. ✅ Bug fixes (extra components, improper dragging)
5. ✅ Type-safe implementation with TypeScript
6. ✅ Redux integration for state management

**Total Files Modified:** 4
**New Dependencies:** 1 (@dnd-kit/sortable)
**Lines of Code Added:** ~200
**Bugs Fixed:** 2 major bugs
