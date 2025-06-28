import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Marketplace link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Marketplace/i);
  expect(linkElement).toBeInTheDocument();
});
