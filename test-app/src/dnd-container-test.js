
import {
    DndContext,
    DragOverlay,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
  } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import useState from "react";
import Item from "./components/Item";
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";
import SortableItem from "./components/SortableItem"

export const DndContainerTest = (items) => {
    const [itemGroups, setItemGroups] = useState(items);
    const [activeId, setActiveId] = useState(null);
  
    const sensors = useSensors(
      useSensor(MouseSensor),
      useSensor(TouchSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
  
    const handleDragStart = ({ active }) => setActiveId(active.id);
  
    const handleDragCancel = () => setActiveId(null);
  
    const handleDragOver = ({ active, over }) => {
      const overId = over?.id;
  
      if (!overId) {
        return;
      }
  
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
  
      if (activeContainer !== overContainer) {
        setItemGroups((itemGroups) => {
          const activeIndex = active.data.current.sortable.index;
          const overIndex =
            over.id in itemGroups
              ? itemGroups[overContainer].length + 1
              : over.data.current.sortable.index;
  
          return moveBetweenContainers(
            itemGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        });
      }
    };
  
    const handleDragEnd = ({ active, over }) => {
      if (!over) {
        setActiveId(null);
        return;
      }
  
      if (active.id !== over.id) {
        const activeContainer = active.data.current.sortable.containerId;
        const overContainer = over.data.current?.sortable.containerId || over.id;
        const activeIndex = active.data.current.sortable.index;
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : over.data.current.sortable.index;
  
        setItemGroups((itemGroups) => {
          let newItems;
          if (activeContainer === overContainer) {
            newItems = {
              ...itemGroups,
              [overContainer]: arrayMove(
                itemGroups[overContainer],
                activeIndex,
                overIndex
              ),
            };
          } else {
            newItems = moveBetweenContainers(
              itemGroups,
              activeContainer,
              activeIndex,
              overContainer,
              overIndex,
              active.id
            );
          }
  
          return newItems;
        });
      }
  
      setActiveId(null);
    };
  
    

    const moveBetweenContainers = (
        items,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        item
      ) => {
        return {
          ...items,
          [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
          [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
        };
      };


    return (
        <>
            <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            >
            <div className="container">
                {Object.keys(itemGroups).map((group) => (
                <SortableContext id={group} items={itemGroups[group]} strategy={rectSortingStrategy}>
                <ul className="droppable" ref={useDroppable({ id })}>
                    {items.map((item) => (
                    <SortableItem key={item} id={item} />
                    ))}
                </ul>
                </SortableContext>
                ))}
            </div>
            <DragOverlay>{activeId ? <Item id={activeId} dragOverlay/> : null}</DragOverlay>
            </DndContext>
        </>
    );
}
export default DndContainerTest;


