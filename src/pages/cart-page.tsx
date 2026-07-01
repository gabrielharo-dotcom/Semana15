import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  selectTotalItems,
  selectTotalPrice,
  useCartStore,
} from "@/stores/cart-store";

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return (
      <PageContainer>
        <div className="py-24 text-center">
          <h1 className="text-3xl font-bold">Tu carrito está vacío</h1>

          <p className="mt-2 text-muted-foreground">
            Agrega tickets desde el catálogo para verlos aquí.
          </p>

          <Button asChild className="mt-6">
            <Link to="/movies">Explorar películas</Link>
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <section className="py-10">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tu carrito</h1>

            <p className="mt-1 text-muted-foreground">
              {totalItems} ticket(s) en total
            </p>
          </div>

          <Button variant="ghost" onClick={clearCart}>
            Vaciar carrito
          </Button>
        </header>

        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 rounded-lg border p-3"
            >
              {item.posterUrl && (
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  className="h-20 w-14 rounded object-cover"
                />
              )}

              <div className="flex-1">
                <p className="font-medium">{item.title}</p>

                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)} c/u
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="icon-sm"
                  variant="outline"
                  onClick={() => decrementQuantity(item.id)}
                  aria-label="Quitar un ticket"
                >
                  <Minus />
                </Button>

                <span className="w-6 text-center tabular-nums">
                  {item.quantity}
                </span>

                <Button
                  size="icon-sm"
                  variant="outline"
                  onClick={() => incrementQuantity(item.id)}
                  aria-label="Agregar un ticket"
                >
                  <Plus />
                </Button>
              </div>

              <p className="w-20 text-right font-medium tabular-nums">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() => removeItem(item.id)}
                aria-label="Eliminar del carrito"
              >
                <Trash2 />
              </Button>
            </li>
          ))}
        </ul>

        <Separator className="my-6" />

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Total</span>

          <span className="text-lg font-bold tabular-nums">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        <Button asChild className="mt-6 w-full" size="lg">
          <Link to="/checkout">Proceder al pago</Link>
        </Button>
      </section>
    </PageContainer>
  );
}
