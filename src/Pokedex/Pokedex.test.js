import React from "react";
import { render, screen, act } from "@testing-library/react";
import Pokedex from ".";

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

  it("should display the correct heading", async () => {
    act(() => {
      render(<Pokedex />);
    });
    expect(await screen.findByText("My Pokedex")).toBeInTheDocument();
  });

  it("should display a list of Pokemon", async () => {
    act(() => {
      render(<Pokedex />);
    });
    expect(await screen.findAllByRole("listitem")).toHaveLength(2);
    expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
    expect(await screen.findByText("ivysaur")).toBeInTheDocument();
  });
});
