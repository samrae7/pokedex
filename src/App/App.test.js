import React from "react";
import { render, screen, act, fireEvent, within } from "@testing-library/react";
import App from ".";

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
    render(<App />);
  });

  it("should navigate between the main page and the details page when you click one of the pokemon", async () => {
    // given user is at "/"
    expect(window.location.pathname).toEqual("/");
    const pokemonLink = await screen.findByText("bulbasaur");

    // when the uset clicks a pokemon link
    act(() => {
      fireEvent.click(pokemonLink);
    });

    // then they are taken to the pokemon detail page
    expect(window.location.pathname).toEqual("/bulbasaur");
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    const { getByText } = within(heading);
    expect(getByText("Bulbasaur")).toBeInTheDocument();
  });
});
