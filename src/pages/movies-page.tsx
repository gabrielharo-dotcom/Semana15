import { useState } from "react";

import PageContainer from "@/components/layout/page-container";
import MoviesGrid from "@/components/movies/movies-grid";
import { Button } from "@/components/ui/button";
import { useMovies } from "@/hooks/use-movies";

export function MoviesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isPlaceholderData } = useMovies(page);

  const totalPages = data?.totalPages ?? 1;

  return (
    <PageContainer>
      <section className="py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Todas las películas</h1>

          <p className="mt-2 text-muted-foreground">
            Explora el catálogo completo y abre el detalle de cada película.
          </p>
        </header>

        <MoviesGrid
          movies={data?.results}
          isLoading={isLoading}
          isError={isError}
          skeletonCount={12}
        />

        {!isError && (
          <nav className="mt-10 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
            >
              Anterior
            </Button>

            <span className="text-sm text-muted-foreground tabular-nums">
              Página {page} de {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              // `isPlaceholderData` es true mientras carga la página siguiente:
              // deshabilitamos el botón para no adelantarnos a datos que aún no llegan.
              disabled={isPlaceholderData || page >= totalPages}
              onClick={() => setPage((current) => current + 1)}
            >
              Siguiente
            </Button>
          </nav>
        )}
      </section>
    </PageContainer>
  );
}
