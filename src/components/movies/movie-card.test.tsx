import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import MovieCard from "@/components/movies/movie-card";
import { useCartStore } from "@/stores/cart-store";
import type { Movie } from "@/types/movie";

const movie: Movie = {
  id: 42,
  title: "Interstellar",
  synopsis: "Un viaje más allá de las estrellas.",
  posterUrl: "https://img.test/w500/interstellar.jpg",
  backdropUrl: "https://img.test/original/interstellar.jpg",
  rating: 8.4,
  releaseDate: "2014-11-07",
};

// MovieCard usa <Link>, así que necesita el contexto del router.
const renderCard = () =>
  render(
    <MemoryRouter>
      <MovieCard movie={movie} />
    </MemoryRouter>,
  );

describe("MovieCard", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("muestra el título y enlaza al detalle de la película", () => {
    renderCard();

    expect(screen.getByText("Interstellar")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /ver detalles/i }),
    ).toHaveAttribute("href", "/movies/42");
  });

  it("agrega la película al carrito al hacer clic en 'Agregar'", async () => {
    renderCard();

    await userEvent.click(screen.getByRole("button", { name: /agregar/i }));

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(42);
  });
});
