// src/toDoList.tsx

import React, { ChangeEventHandler, useState } from "react";
import "./App.css";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constants";
import { useParams } from "react-router-dom";

export function ToDoList() {
  const { name } = useParams<{ name?: string }>();
  const displayName = name || "User";

  const [numRemainingItems, setNumRemainingItems] = useState(0);
  const [items, setItems] = useState<GroceryItem[]>(dummyGroceryList);

  function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
    const checkbox = e.target;
    const itemName = checkbox.name;
    const itemIndex = items.findIndex((item) => item.name === itemName);

    items[itemIndex] = { name: itemName, isPurchased: checkbox.checked };

    const uncheckedItems = items.filter((item) => !item.isPurchased);
    const checkedItems = items.filter((item) => item.isPurchased);

    const newItems = uncheckedItems.concat(checkedItems);

    setItems(newItems);

    const diff = checkbox.checked ? 1 : -1;

    setNumRemainingItems(numRemainingItems + diff);
  }

  return (
    <div className="App">
      <div className="App-body">
        <h1>{displayName}'s To Do List</h1>
        Items bought: {numRemainingItems}
        <form action=".">
          {items.map((item) => ListItem(item, handleCheckboxClick))}
        </form>
      </div>
    </div>
  );
}

function ListItem(item: GroceryItem, changeHandler: ChangeEventHandler) {
  return (
    <div key={item.name} data-testid={`todo-item-${item.name}`}>
      <input
        type="checkbox"
        onChange={changeHandler}
        checked={item.isPurchased}
        name={item.name}
        data-testid={`checkbox-${item.name}`}
      />
      {item.name}
    </div>
  );
}