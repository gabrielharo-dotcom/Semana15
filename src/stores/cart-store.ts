import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Movie } from "@/types/movie";

/**
 * Precio simulado por ticket. TMDB no provee precios (es un catálogo de datos),
 * así que definimos uno fijo para la parte de e-commerce del proyecto.
 */
export const TICKET_PRICE = 9.9;

/** Una línea del carrito: una película con la cantidad de tickets. */
export interface CartItem {
  id: number;
  title: string;
  posterUrl: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  /** Agrega un ticket de una película (suma cantidad si ya estaba). */
  addTicket: (movie: Movie) => void;
  /** Elimina por completo una película del carrito. */
  removeItem: (movieId: number) => void;
  /** Suma un ticket a una película existente. */
  incrementQuantity: (movieId: number) => void;
  /** Resta un ticket; si llega a 0, la película sale del carrito. */
  decrementQuantity: (movieId: number) => void;
  /** Vacía el carrito. */
  clearCart: () => void;
}

/**
 * Store global del carrito (Zustand).
 *
 * - `create` genera un hook (`useCartStore`) usable desde cualquier componente.
 * - El middleware `persist` guarda el estado en localStorage con la clave
 *   "cinespoilers-cart", así el carrito sobrevive a recargas de página.
 * - Cada acción usa `set` de forma inmutable (nunca mutamos el array original),
 *   que es lo que React necesita para re-renderizar correctamente.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addTicket: (movie) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === movie.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === movie.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: movie.id,
                title: movie.title,
                posterUrl: movie.posterUrl,
                price: TICKET_PRICE,
                quantity: 1,
              },
            ],
          };
        }),

      removeItem: (movieId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== movieId),
        })),

      incrementQuantity: (movieId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === movieId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      decrementQuantity: (movieId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === movieId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: "cinespoilers-cart" },
  ),
);

/**
 * Selectores derivados. Se usan como `useCartStore(selectTotalItems)` para leer
 * valores calculados; al devolver un primitivo, no provocan renders infinitos.
 */
export const selectTotalItems = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state: CartState) =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);
