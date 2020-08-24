import React from "react";
import {
  render,
  screen,
  waitForElement,
  cleanup,
} from "@testing-library/react";
import PokemonDetails from ".";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

async function setUp() {
  const history = createMemoryHistory();
  const state = { url: "/some-url" };
  history.push("/Foomon", state);

  await render(
    <Router history={history}>
      <Route path="/:name">
        <PokemonDetails />
      </Route>
    </Router>
  );
}

describe("PokemonDetails", () => {
  afterEach(() => {
    fetch.resetMocks();
    cleanup();
  });

  it("should show loading state at first", async () => {
    await setUp();
    const loading = await waitForElement(() => screen.getByText("Loading..."));
    expect(loading).toBeInTheDocument();
  });

  it("should fetch and display Pokemon types", async () => {
    fetch.mockResponse(
      JSON.stringify({
        types: [{ type: { name: "fire" } }, { type: { name: "water" } }],
      })
    );
    await setUp();
    expect(await screen.findByText("Foomon")).toBeInTheDocument();
    expect(await screen.findByText("fire,")).toBeInTheDocument();
    expect(await screen.findByText("water")).toBeInTheDocument();
  });
});
