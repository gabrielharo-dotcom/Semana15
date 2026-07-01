import { tmdbClient } from "@/services/http-client";
import { getMovieDetails, getPopularMovies } from "@/services/movies";
import type { TmdbMovie, TmdbMovieDetails } from "@/types/tmdb";

// Reemplazamos el cliente HTTP real por un mock: los tests no tocan la red.
vi.mock("@/services/http-client", () => ({
  tmdbClient: { get: vi.fn() },
}));

const mockedGet = vi.mocked(tmdbClient.get);

const tmdbMovie: TmdbMovie = {
  id: 1,
  title: "Dune",
  overview: "Arrakis.",
  poster_path: "/dune.jpg",
  backdrop_path: "/dune-bg.jpg",
  vote_average: 8.1,
  release_date: "2021-01-01",
};

describe("movies service", () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it("mapea la respuesta cruda de TMDB al modelo de dominio", async () => {
    mockedGet.mockResolvedValue({
      data: { page: 1, total_pages: 10, total_results: 200, results: [tmdbMovie] },
    });

    const result = await getPopularMovies(1);

    expect(mockedGet).toHaveBeenCalledWith("/movie/popular", {
      params: { page: 1 },
    });
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(10);
    expect(result.results[0]).toEqual({
      id: 1,
      title: "Dune",
      synopsis: "Arrakis.",
      posterUrl: "https://img.test/w500/dune.jpg",
      backdropUrl: "https://img.test/original/dune-bg.jpg",
      rating: 8.1,
      releaseDate: "2021-01-01",
    });
  });

  it("devuelve posterUrl vacío cuando TMDB no tiene imagen", async () => {
    mockedGet.mockResolvedValue({
      data: {
        page: 1,
        total_pages: 1,
        total_results: 1,
        results: [{ ...tmdbMovie, poster_path: null }],
      },
    });

    const result = await getPopularMovies();

    expect(result.results[0].posterUrl).toBe("");
  });

  it("mapea el detalle aplanando los géneros", async () => {
    const details: TmdbMovieDetails = {
      ...tmdbMovie,
      genres: [
        { id: 878, name: "Ciencia ficción" },
        { id: 12, name: "Aventura" },
      ],
      runtime: 155,
      tagline: "El miedo es el asesino de la mente.",
      vote_count: 1000,
    };
    mockedGet.mockResolvedValue({ data: details });

    const result = await getMovieDetails(1);

    expect(mockedGet).toHaveBeenCalledWith("/movie/1");
    expect(result.genres).toEqual(["Ciencia ficción", "Aventura"]);
    expect(result.runtime).toBe(155);
    expect(result.voteCount).toBe(1000);
  });
});
