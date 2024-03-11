import React, { useState, useEffect } from "react";
import update from "immutability-helper"

export const DndContainer = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'firstasdjkahsaskakskdjasjkdjkakjsssssssssssssskjskkdasd aasdasdakslk',
            positionx: null,
            positiony: null,
        },
        {
            id: 2,
            name: 'second',
            positionx: null,
            positiony: null,
        },
        {
            id: 3,
            name: 'third',
            positionx: null,
            positiony: null,
        },
    ]);
    const [draggingItem, setDraggingItem] = useState(null);

    const handleDragStart = (e, item) => {
        setDraggingItem(item);
        e.dataTransfer.setData('text/plain', '');
    };


    const handleDragEnd = () => {
        setDraggingItem(null);
    };

    const handleDragOver = (e, targetItem) => {
        e.preventDefault();
        
        const currentIndex = items.indexOf(draggingItem);
        const targetIndex = items.indexOf(targetItem);
        if (currentIndex !== -1 && targetIndex !== -1) {
            setItems((prevItems) =>
                update(prevItems, {
                    $splice: [
                        [currentIndex, 1],
                        [targetIndex, 0, draggingItem],
                    ]
            }));
        }
    };

    const handleDrop = (e, targetItem) => {
        if (!draggingItem) return;

        const currentIndex = items.indexOf(draggingItem);
        const targetIndex = items.indexOf(targetItem);

        if (currentIndex !== -1 && targetIndex !== -1) {
            setItems((prevItems) =>
                update(prevItems, {
                    $splice: [
                        [currentIndex, 1],
                        [targetIndex, 0, draggingItem],
                    ]
            }));
        }
    };

    useEffect(() => {
    const noSelectElements =
    document.querySelectorAll(".item.details");
    
    noSelectElements.forEach((element) => {
        element.style.mozUserSelect = "none";
        element.style.msUserSelect = "none";
        element.style.userSelect = "none";
    });
})
    return (
        <>
            <div className="sortable-list">
                {items.map((item, index) => (
                <>
                    <div class="details"
                        key={item.id}
                        index={index}
                        id={item.id}
                        className={`item ${item === draggingItem ?
                            'dragging' : ''}`}
                        onDragStart={(e) => handleDragStart(e, item)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => handleDragOver(e, item)}
                        onDrop={(e) => handleDrop(e, item)}   >
                            {item.name}
                    </div>
                </> 
                ))}
            </div>
        </>
    );
}
export default DndContainer;