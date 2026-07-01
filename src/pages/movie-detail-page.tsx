import { ArrowLeft, Clock, Plus, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMovie } from "@/hooks/use-movies";
import { TICKET_PRICE, useCartStore } from "@/stores/cart-store";

export function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const id = Number(movieId);

  const { data: movie, isLoading, isError } = useMovie(id);
  const addTicket = useCartStore((state) => state.addTicket);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="py-8">
          <Skeleton className="h-48 w-full rounded-xl md:h-64" />

          <div className="mt-8 grid gap-8 md:grid-cols-[280px_1fr]">
            <Skeleton className="aspect-2/3 w-full rounded-xl" />

            <div className="space-y-4">
              <Skeleton className="h-9 w-2/3" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (isError || !movie) {
    return (
      <PageContainer>
        <div className="py-24 text-center">
          <h1 className="text-3xl font-bold">Película no encontrada</h1>

          <p className="mt-2 text-muted-foreground">
            No pudimos encontrar la película que buscas.
          </p>

          <Button asChild className="mt-6">
            <Link to="/movies">Volver al catálogo</Link>
          </Button>
        </div>
      </PageContainer>
    );
  }

  const releaseYear = movie.releaseDate
    ? movie.releaseDate.slice(0, 4)
    : "N/D";

  return (
    <PageContainer>
      <div className="py-8">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link to="/movies">
            <ArrowLeft />
            Volver al catálogo
          </Link>
        </Button>

        {movie.backdropUrl && (
          <div className="relative h-48 w-full overflow-hidden rounded-xl md:h-64">
            <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        )}

        <div className="mt-8 grid gap-8 md:grid-cols-[280px_1fr]">
          {movie.posterUrl && (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="aspect-2/3 w-full rounded-xl object-cover"
            />
          )}

          <div>
            <h1 className="text-3xl font-bold md:text-4xl">{movie.title}</h1>

            {movie.tagline && (
              <p className="mt-2 text-lg text-muted-foreground italic">
                {movie.tagline}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{releaseYear}</span>

              <span className="flex items-center gap-1">
                <Star className="size-4 fill-current text-yellow-500" />
                {movie.rating.toFixed(1)}
                <span className="text-xs">({movie.voteCount})</span>
              </span>

              {movie.runtime ? (
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {movie.runtime} min
                </span>
              ) : null}
            </div>

            {movie.genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            )}

            <Separator className="my-6" />

            <h2 className="text-lg font-semibold">Sinopsis</h2>

            <p className="mt-2 text-muted-foreground">
              {movie.synopsis || "Sin sinopsis disponible."}
            </p>

            <Button
              className="mt-8"
              size="lg"
              onClick={() => addTicket(movie)}
            >
              <Plus />
              Agregar al carrito · ${TICKET_PRICE.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
