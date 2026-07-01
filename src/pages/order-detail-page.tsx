import { CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { selectOrderById, useOrdersStore } from "@/stores/orders-store";

export function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = useOrdersStore(selectOrderById(orderId ?? ""));

  if (!order) {
    return (
      <PageContainer>
        <div className="py-24 text-center">
          <h1 className="text-3xl font-bold">Orden no encontrada</h1>

          <p className="mt-2 text-muted-foreground">
            No existe una compra con ese identificador.
          </p>

          <Button asChild className="mt-6">
            <Link to="/orders">Ver mis compras</Link>
          </Button>
        </div>
      </PageContainer>
    );
  }

  const purchaseDate = new Date(order.createdAt).toLocaleString("es-ES", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <PageContainer>
      <section className="mx-auto max-w-2xl py-12">
        <div className="text-center">
          <CheckCircle2 className="mx-auto size-14 text-green-600" />

          <h1 className="mt-4 text-3xl font-bold">¡Pago exitoso!</h1>

          <p className="mt-2 text-muted-foreground">
            Gracias por tu compra, {order.customerName}. Enviamos la
            confirmación a {order.customerEmail}.
          </p>
        </div>

        <div className="mt-10 rounded-lg border p-6">
          <div className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
            <span>
              Orden{" "}
              <span className="font-mono text-foreground">
                #{order.id.slice(0, 8)}
              </span>
            </span>
            <span>{purchaseDate}</span>
          </div>

          <Separator className="my-4" />

          <ul className="space-y-3">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.title}{" "}
                  <span className="text-muted-foreground">
                    × {item.quantity}
                  </span>
                </span>
                <span className="tabular-nums">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <Separator className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="tabular-nums">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline">
            <Link to="/orders">Ver mis compras</Link>
          </Button>
          <Button asChild>
            <Link to="/movies">Seguir explorando</Link>
          </Button>
        </div>
      </section>
    </PageContainer>
  );
}
