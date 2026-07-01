import {
  selectTotalItems,
  selectTotalPrice,
  TICKET_PRICE,
  useCartStore,
} from "@/stores/cart-store";
import type { Movie } from "@/types/movie";

const movie: Movie = {
  id: 1,
  title: "Dune",
  synopsis: "Arrakis.",
  posterUrl: "https://img.test/w500/dune.jpg",
  backdropUrl: "https://img.test/original/dune.jpg",
  rating: 8.1,
  releaseDate: "2021-01-01",
};

const otherMovie: Movie = { ...movie, id: 2, title: "Interstellar" };

describe("cart-store", () => {
  // Reiniciamos el estado antes de cada test para que sean independientes.
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("agrega una película nueva con cantidad 1 y el precio del ticket", () => {
    useCartStore.getState().addTicket(movie);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      id: 1,
      title: "Dune",
      quantity: 1,
      price: TICKET_PRICE,
    });
  });

  it("suma la cantidad si la película ya está en el carrito", () => {
    const { addTicket } = useCartStore.getState();
    addTicket(movie);
    addTicket(movie);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it("incrementa y decrementa la cantidad", () => {
    const store = useCartStore.getState();
    store.addTicket(movie);
    store.incrementQuantity(1);
    expect(useCartStore.getState().items[0].quantity).toBe(2);

    store.decrementQuantity(1);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it("elimina la película cuando la cantidad llega a 0", () => {
    const store = useCartStore.getState();
    store.addTicket(movie);
    store.decrementQuantity(1);

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("elimina y vacía el carrito", () => {
    const store = useCartStore.getState();
    store.addTicket(movie);
    store.addTicket(otherMovie);

    store.removeItem(1);
    expect(useCartStore.getState().items).toHaveLength(1);

    store.clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("calcula el total de tickets y el precio total", () => {
    const store = useCartStore.getState();
    store.addTicket(movie); // x1
    store.addTicket(movie); // x2
    store.addTicket(otherMovie); // x1

    const state = useCartStore.getState();
    expect(selectTotalItems(state)).toBe(3);
    expect(selectTotalPrice(state)).toBeCloseTo(TICKET_PRICE * 3);
  });
});
