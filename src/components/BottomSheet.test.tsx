import { render, fireEvent, screen } from "@testing-library/react";
import BottomSheet from "./BottomSheet";

describe("BottomSheet Component", () => {
  it("renders without errors", () => {
    render(<BottomSheet />);
    expect(screen.getByText("Open Bottom Sheet")).toBeInTheDocument();
  });

  it("opens when the button is clicked", () => {
    render(<BottomSheet />);
    const openButton = screen.getByText("Open Bottom Sheet");
    fireEvent.click(openButton);
    expect(screen.getByText("Bottom Sheet")).toBeInTheDocument();
  });

  it("closes when the overlay is clicked", () => {
    render(<BottomSheet />);
    const openButton = screen.getByText("Open Bottom Sheet");
    fireEvent.click(openButton);
    const overlay = screen.getByTestId("sheet-overlay");
    fireEvent.click(overlay);
    expect(screen.getByText("Open Bottom Sheet")).toBeInTheDocument();
  });

  it("changes height when buttons are clicked", () => {
    render(<BottomSheet />);
    const openButton = screen.getByText("Open Bottom Sheet");
    fireEvent.click(openButton);

    const topButton = screen.getByText("Top");
    const middleButton = screen.getByText("Middle");
    const bottomButton = screen.getByText("Bottom");

    fireEvent.click(topButton);
    expect(screen.getByTestId("content")).toHaveStyle("height: 90vh");

    fireEvent.click(middleButton);
    expect(screen.getByTestId("content")).toHaveStyle("height: 50vh");

    fireEvent.click(bottomButton);
    expect(screen.getByTestId("content")).toHaveStyle("height: 30vh");
  });
});
