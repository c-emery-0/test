import { useSortable } from "@dnd-kit/sortable"
import ListItem from "./ListItem"
import React from "react"

export const SortableListItem = props => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: props.id
  })

  return (
    <ListItem
      isDragging={isDragging}
      listeners={listeners}
      ref={setNodeRef}
      transform={transform}
      transition={transition}
      {...props}
      {...attributes}
    />
  )
}

export default SortableListItem
