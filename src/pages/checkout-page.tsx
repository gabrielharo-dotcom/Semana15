import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  selectTotalPrice,
  useCartStore,
} from "@/stores/cart-store";
import { useOrdersStore } from "@/stores/orders-store";

interface FormState {
  name: string;
  email: string;
  card: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

/** Valida el formulario y devuelve los errores encontrados. */
function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Ingresa tu nombre.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Ingresa un email válido.";
  }

  // Simulación: aceptamos 16 dígitos (ignorando espacios).
  if (form.card.replace(/\s/g, "").length !== 16) {
    errors.card = "La tarjeta debe tener 16 dígitos.";
  }

  return errors;
}

export function CheckoutPage() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore(selectTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const createOrder = useOrdersStore((state) => state.createOrder);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    card: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Si no hay nada que pagar (y no estamos en pleno proceso), invitamos a volver.
  if (items.length === 0 && !isProcessing) {
    return (
      <PageContainer>
        <div className="py-24 text-center">
          <h1 className="text-3xl font-bold">No hay nada que pagar</h1>

          <p className="mt-2 text-muted-foreground">
            Tu carrito está vacío.
          </p>

          <Button asChild className="mt-6">
            <Link to="/movies">Explorar películas</Link>
          </Button>
        </div>
      </PageContainer>
    );
  }

  const updateField = (field: keyof FormState) => (value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsProcessing(true);

    // Simulamos la latencia de una pasarela de pago real.
    setTimeout(() => {
      const order = createOrder({
        items,
        total: totalPrice,
        customerName: form.name.trim(),
        customerEmail: form.email.trim(),
      });

      clearCart();
      navigate(`/orders/${order.id}`, { replace: true });
    }, 1600);
  };

  return (
    <PageContainer>
      <section className="py-10">
        <h1 className="mb-8 text-3xl font-bold">Finalizar compra</h1>

        <div className="grid gap-10 md:grid-cols-[1fr_320px]">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Nombre completo
              </label>
              <Input
                id="name"
                value={form.name}
                onChange={(event) => updateField("name")(event.target.value)}
                placeholder="Ada Lovelace"
                aria-invalid={Boolean(errors.name)}
                disabled={isProcessing}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email")(event.target.value)}
                placeholder="ada@correo.com"
                aria-invalid={Boolean(errors.email)}
                disabled={isProcessing}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="card" className="text-sm font-medium">
                Número de tarjeta (simulado)
              </label>
              <Input
                id="card"
                inputMode="numeric"
                value={form.card}
                onChange={(event) => updateField("card")(event.target.value)}
                placeholder="4242 4242 4242 4242"
                aria-invalid={Boolean(errors.card)}
                disabled={isProcessing}
              />
              {errors.card && (
                <p className="text-sm text-destructive">{errors.card}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" />
                  Procesando pago…
                </>
              ) : (
                `Pagar $${totalPrice.toFixed(2)}`
              )}
            </Button>
          </form>

          <aside className="h-fit rounded-lg border p-5">
            <h2 className="font-semibold">Resumen del pedido</h2>

            <ul className="mt-4 space-y-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between text-sm text-muted-foreground"
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span className="tabular-nums">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="tabular-nums">${totalPrice.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </section>
    </PageContainer>
  );
}
