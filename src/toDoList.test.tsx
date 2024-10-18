// src/toDoList.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

describe("ToDoList Component", () => {
  test("renders all items in the list", () => {
    render(
      <MemoryRouter initialEntries={["/todolist/John"]}>
        <ToDoList />
      </MemoryRouter>
    );

    const items = screen.getAllByTestId(/todo-item-/);
    expect(items.length).toBe(2); // Adjust based on the number of items

    expect(screen.getByText("Apples")).toBeInTheDocument();
    expect(screen.getByText("Bananas")).toBeInTheDocument();
  });

  test("updates the number of items checked", () => {
    render(
      <MemoryRouter initialEntries={["/todolist/John"]}>
        <ToDoList />
      </MemoryRouter>
    );

    const itemsBoughtText = screen.getByText(/Items bought: 0/i);
    expect(itemsBoughtText).toBeInTheDocument();

    const checkboxApples = screen.getByTestId("checkbox-Apples");
    fireEvent.click(checkboxApples);

    expect(screen.getByText(/Items bought: 1/i)).toBeInTheDocument();
  });
});