import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/stores/cart-store";
import type { Movie } from "@/types/movie";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  // Leemos SOLO la acción que necesitamos: el componente no se re-renderiza
  // cuando cambian los items del carrito, solo cuando cambia esta referencia.
  const addTicket = useCartStore((state) => state.addTicket);

  return (
    <article>
      <Card className="overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="aspect-2/3 w-full object-cover"
        />

        <CardHeader>
          <CardTitle>{movie.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
            {movie.synopsis}
          </p>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to={`/movies/${movie.id}`}>Ver detalles</Link>
            </Button>

            <Button
              size="sm"
              onClick={() => addTicket(movie)}
            >
              <Plus />
              Agregar
            </Button>
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

export default MovieCard;
