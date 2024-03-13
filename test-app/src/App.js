import "./index.css";
import DndTest from "./dnd-test.js";
import { useState } from "react";

export default function App() {
  
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
])

  return (
    <div className="App">
      <div className="sortable-list">
        <DndTest file = {items}/>
      </div>
    </div>
  );

}
