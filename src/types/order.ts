import type { CartItem } from "@/stores/cart-store";

/**
 * Una compra ya realizada (orden). Guarda una "foto" de los items en el
 * momento del pago, para que el historial no cambie si luego se modifica algo.
 */
export interface Order {
  id: string;
  /** Fecha de compra en formato ISO. */
  createdAt: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
}
