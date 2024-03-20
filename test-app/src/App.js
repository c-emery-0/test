import "./index.css";
import DndTest from "./dnd-test.js";
import { useState } from "react";

export default function App() {
  
  const [items, setItems] = useState(() =>
    Array.from(Array(20).keys()).map((it) => "test " + String(it + 1))
  );

  return (
    <div className="App">
      <div className="sortable-list">
        <DndTest file = {items}/>
      </div>
    </div>
  );

}
