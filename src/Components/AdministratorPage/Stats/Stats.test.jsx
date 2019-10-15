import React from "react";
import TestUtils from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Stats, { formatNum } from "./Stats";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("formatNum", () => {
  it("is defined", () => {
    expect(formatNum(1000)).toBe("1,000");
  });
});

describe("Stats", () => {
  const props = {
    stats: [],
    statsIsLoading: false,
    statsHasErrored: false,
    getStats: () => {},
  };

  it("mounts", () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <Stats {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toBeDefined();
  });
});
