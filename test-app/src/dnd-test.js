import "./index.css";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragOverlay,
} from "@dnd-kit/core";

import {
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";
import ListItem from "./ListItem";

import SortableListItem from "./SortableListItem";

import "./styles.css";

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
  const [items, setItems] = useState(file);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  
  const [activeId, setActiveId] = useState(null);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }/*
  function handleDragOver(event, targetItem) {

    const { active, over } = event;

    if (activeId !== over.id) {
      setitems((items) => {
        const oldIndex = items.indexOf(activeId);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };*/
  function handleDragEnd(event) {
    setActiveId("-1");
    const { active, over } = event;

    if (over == null) return;

    const activeIndex = items.indexOf(active.id);
    const overIndex = items.indexOf(over.id);

    if (activeIndex !== overIndex) {
      setItems((current) => arrayMove(current, activeIndex, overIndex));
    }
  }
  function handleDragCancel(event) {
    setActiveId(-1);
  }

  return (
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          onDragStart={handleDragStart}
        >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              <ol className="list">
                {items.map((it) => (
                  <SortableListItem key={it} id={it} />
                ))}
              </ol>
            </SortableContext>
          
            {createPortal(
              <DragOverlay>
                {activeId === "-1" ? null : <ListItem isOverlay id={activeId} />}
              </DragOverlay>,
              document.body
            )}

        </DndContext>
  );

}
export default DndContainer;