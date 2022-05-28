import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Tab from "../components/Main/Tabs/Tab";
import TabList from "../components/Main/Tabs/TabList";

describe("Tabs area", () => {
  const spyId = "1";
  const spyOnClick = jest.fn();
  const sypOnClose = jest.fn();

  test("should render tab", () => {
    render(
      <Tab
        id={spyId}
        title="성공"
        tabState="123"
        onClick={spyOnClick}
        onClose={sypOnClose}
      />
    );

    userEvent.click(screen.getByText("성공"));
    userEvent.click(screen.getByTitle("Close"));

    expect(screen.getByText("성공")).toBeInTheDocument();
    expect(spyOnClick).toBeCalledTimes(1);
    expect(sypOnClose).toBeCalledTimes(1);
  });

  test("shoud render tabList", () => {
    render(
      <TabList>
        <Tab
          id={spyId}
          title="성공"
          tabState="123"
          onClick={spyOnClick}
          onClose={sypOnClose}
        />
      </TabList>
    );

    expect(screen.getByText("성공")).toBeInTheDocument();
  });
});
