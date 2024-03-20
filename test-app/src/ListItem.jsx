import React, { forwardRef } from "react"
import cx from "classnames"
import { snapGridModifier } from "./snapGridModifier.ts"

const ListItem = forwardRef(function ListItem(
  {
    id,
    isDragging = false,
    isOverlay = false,
    listeners,
    transform,
    transition,
    ...props
  },
  ref
) {

  
  return (
    <li          
      className={cx(
        "list-item",
        isDragging && "list-item--dragging",
        isOverlay && "list-item--overlay"
      )}
      ref={ref}
      style={{
        transition,

        "--translate-x": transform ? `${Math.round(transform.x)}px` : undefined,

        "--translate-y": transform ? `${Math.round(transform.y)}px` : undefined,

        "--scale-x": transform?.scaleX ? `${transform.scaleX}` : undefined,
        "--scale-y": transform?.scaleY ? `${transform.scaleY}` : undefined
      }}
    >
      <div className="list-item-content" {...props}>
        <button className="list-item-handle" type="button" {...listeners}>
         asdakjdshakj
        </button>
        <div className="list-item-id">{id}</div>
      </div>
    </li>
  )
})

export default ListItem
