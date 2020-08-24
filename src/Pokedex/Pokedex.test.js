import React from "react";
import {
  render,
  screen,
  act,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import Pokedex from ".";
import { BrowserRouter as Router } from "react-router-dom";

describe("Pokedex", () => {
  afterAll(() => {
    fetch.resetMocks();
  });

  beforeAll(() => {
    fetch.mockResponse(
      JSON.stringify({
        results: [
          { name: "bulbasaur", url: "acme.co.nz" },
          { name: "ivysaur", url: "acme.co.nz" },
        ],
      })
    );
  });

  beforeEach(() => {
    render(
      <Router>
        <Pokedex />
      </Router>
    );
  });

  it("should display the correct heading", async () => {
    expect(await screen.findByText("My Pokedex")).toBeInTheDocument();
  });

  it("should display a list of Pokemon", async () => {
    expect(await screen.findAllByRole("listitem")).toHaveLength(2);
    expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
    expect(await screen.findByText("ivysaur")).toBeInTheDocument();
  });

  it("should take you to the details page when you click one of the pokemon", async () => {
    expect(window.location.pathname).toEqual("/");
    const pokemonLink = await screen.findByText("bulbasaur");
    act(() => {
      fireEvent.click(pokemonLink);
    });
    expect(window.location.pathname).toEqual("/bulbasaur");
  });
});

describe("Pokedex loading state", () => {
  it("should display the loading state", async () => {
    const screen = await render(
      <Router>
        <Pokedex />
      </Router>
    );
    const loading = await waitForElement(() => screen.getByText("Loading..."));
    expect(loading).toBeInTheDocument();
  });
});
