import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Tab from "../components/main/Tabs/Tab";
import TabList from "../components/main/Tabs/TabList";

describe("Tabs area", () => {
  const spyId = "1";
  const mockOnClick = jest.fn();
  const mockOnClose = jest.fn();

  test("should render tab", () => {
    render(
      <Tab
        id={spyId}
        title="성공"
        tabState="123"
        onClick={mockOnClick}
        onClose={mockOnClose}
      />
    );

    userEvent.click(screen.getByText("성공"));
    userEvent.click(screen.getByTitle("Close"));

    expect(screen.getByText("성공")).toBeInTheDocument();
    expect(mockOnClick).toBeCalledTimes(1);
    expect(mockOnClose).toBeCalledTimes(1);
  });

  test("shoud render tabList", () => {
    render(
      <TabList>
        <Tab
          id={spyId}
          title="성공"
          tabState="123"
          onClick={mockOnClick}
          onClose={mockOnClose}
        />
      </TabList>
    );

    expect(screen.getByText("성공")).toBeInTheDocument();
  });
});
