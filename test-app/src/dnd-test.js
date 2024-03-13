import "./index.css";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";

import {
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove
} from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { snapGridModifier } from "./asdf.ts"

function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      className="item"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.id.name}
    </div>
  );
}
export const DndContainer = ({file}) => {
  const [items, setitems] = useState(file);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  
  const [activeId, setActiveId] = useState(null);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }
  function handleDragOver(event, targetItem) {

    const { active, over } = event;

    if (activeId !== over.id) {
      setitems((items) => {
        const oldIndex = items.indexOf(activeId);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
        <DndContext
          sensors={sensors}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
          modifiers={[snapGridModifier]}
        >
            <SortableContext
              items={items}
            >
              {items.map((item) => (
                <SortableItem key={item} id={item} />
              ))}
            </SortableContext>

        </DndContext>
  );

}
export default DndContainer;