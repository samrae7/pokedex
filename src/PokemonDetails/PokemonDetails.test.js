import React from "react";
import { render, screen, act } from "@testing-library/react";
import PokemonDetails from ".";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("PokemonDetails", () => {
  afterAll(() => {
    fetch.resetMocks();
  });

  beforeAll(() => {
    fetch.mockResponse(
      JSON.stringify({
        types: [{ type: { name: "fire" } }, { type: { name: "water" } }],
      })
    );

    const history = createMemoryHistory();
    const state = { url: "/some-url" };
    history.push("/Foomon", state);
    act(() => {
      render(
        <Router history={history}>
          <Route path="/:name">
            <PokemonDetails />
          </Route>
        </Router>
      );
    });
  });

  it("should fetch and display Pokemon types", async () => {
    expect(await screen.findByText("Foomon")).toBeInTheDocument();
    expect(await screen.findByText("fire,")).toBeInTheDocument();
    expect(await screen.findByText("water")).toBeInTheDocument();
  });
});
