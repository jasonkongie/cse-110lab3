// src/App.test.tsx

import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeContext, themes } from './ThemeContext';

test("renders Create Note", () => {
  render(
    <BrowserRouter>
      <ThemeContext.Provider value={themes.light}>
        <App />
      </ThemeContext.Provider>
    </BrowserRouter>
  );
  const createNoteElement = screen.getByText(/Create Note/i);
  expect(createNoteElement).toBeInTheDocument();
});