import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem } from "@/stores/cart-store";
import type { Order } from "@/types/order";

interface CreateOrderInput {
  items: CartItem[];
  total: number;
  customerName: string;
  customerEmail: string;
}

interface OrdersState {
  orders: Order[];
  /** Crea una orden a partir del carrito y la devuelve (con id y fecha). */
  createOrder: (input: CreateOrderInput) => Order;
}

/**
 * Store del historial de compras (Zustand + persist).
 *
 * Está separado del carrito a propósito: el carrito es efímero (lo que estás
 * por comprar), mientras que las órdenes son permanentes (lo que ya compraste).
 * Separar responsabilidades mantiene cada store simple.
 */
export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],

      createOrder: (input) => {
        const order: Order = {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          ...input,
        };

        // Añadimos al inicio para que la compra más reciente quede primero.
        set((state) => ({ orders: [order, ...state.orders] }));

        return order;
      },
    }),
    { name: "cinespoilers-orders" },
  ),
);

/** Selector: busca una orden por id. Devuelve `undefined` si no existe. */
export const selectOrderById =
  (orderId: string) => (state: OrdersState) =>
    state.orders.find((order) => order.id === orderId);
