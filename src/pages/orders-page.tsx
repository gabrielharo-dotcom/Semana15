import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { useOrdersStore } from "@/stores/orders-store";

export function OrdersPage() {
  const orders = useOrdersStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <PageContainer>
        <div className="py-24 text-center">
          <h1 className="text-3xl font-bold">Aún no tienes compras</h1>

          <p className="mt-2 text-muted-foreground">
            Cuando compres tickets, aparecerán aquí.
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
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Mis compras</h1>

          <p className="mt-2 text-muted-foreground">
            Historial de todas tus órdenes.
          </p>
        </header>

        <ul className="flex flex-col gap-3">
          {orders.map((order) => {
            const itemCount = order.items.reduce(
              (total, item) => total + item.quantity,
              0,
            );
            const date = new Date(order.createdAt).toLocaleDateString("es-ES", {
              dateStyle: "medium",
            });

            return (
              <li key={order.id}>
                <Link
                  to={`/orders/${order.id}`}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted"
                >
                  <div>
                    <p className="font-medium">
                      Orden{" "}
                      <span className="font-mono">#{order.id.slice(0, 8)}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {date} · {itemCount} ticket(s)
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-semibold tabular-nums">
                      ${order.total.toFixed(2)}
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </PageContainer>
  );
}
