import { Film, Menu, ShoppingCart } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { selectTotalItems, useCartStore } from "@/stores/cart-store";

const navigationItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Movies",
    href: "/movies",
  },
  {
    label: "Compras",
    href: "/orders",
  },
];

export function Navbar() {
  // El contador se recalcula automáticamente cuando cambia el carrito,
  // demostrando el estado global compartido entre rutas y componentes.
  const totalItems = useCartStore(selectTotalItems);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Film className="h-5 w-5 text-blue-600" />

          <span className="text-lg">
            CineSpoilerS
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-2 md:flex">
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant="ghost"
              >
                <NavLink to={item.href}>
                  {item.label}
                </NavLink>
              </Button>
            ))}
          </nav>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Link to="/cart" aria-label="Ver carrito">
              <ShoppingCart />

              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 justify-center px-1 tabular-nums">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className="justify-start"
                  >
                    <NavLink to={item.href}>
                      {item.label}
                    </NavLink>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
