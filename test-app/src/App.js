import React, { useState } from "react";
import { DndContainerTest } from "./dnd-container-test";
import "./App.css";

function App() {
  const items = {
    group1: ["1", "2", "3"],
    group2: ["4", "5", "6"],
    group3: ["7", "8", "9"],
  };


  return (
    <DndContainerTest items={items}/>
  );
}

export default App;
