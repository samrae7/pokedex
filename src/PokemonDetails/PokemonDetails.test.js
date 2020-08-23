import React from "react";
import { render, screen, act, fireEvent, debug } from "@testing-library/react";
import PokemonDetails from ".";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("PokemonDetails", () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    history.push("/Foomon");
    render(
      <Router history={history}>
        <Route path="/:name" children={<PokemonDetails />} />
      </Router>
    );
  });

  it("should display the correct heading", async () => {
    expect(await screen.findByText("Foomon")).toBeInTheDocument();
  });

  it("should fetch and display Pokemon types", async () => {
    expect(await screen.findByText("Types: fire, water")).toBeInTheDocument();
  });
});
