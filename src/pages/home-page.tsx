import HeroSection from "@/components/home/hero-section";
import PageContainer from "@/components/layout/page-container";
import MoviesGrid from "@/components/movies/movies-grid";
import { useMovies } from "@/hooks/use-movies";

const FEATURED_COUNT = 6;

const HomePage = () => {
  const { data, isLoading, isError } = useMovies();

  return (
    <>
      <PageContainer>
        <HeroSection />
      </PageContainer>

      <PageContainer>
        <section className="py-4">
          <header className="mb-8">
            <h2 className="text-3xl font-bold">Películas populares</h2>

            <p className="mt-2 text-muted-foreground">
              Los estrenos más vistos ahora mismo.
            </p>
          </header>

          <MoviesGrid
            movies={data?.results.slice(0, FEATURED_COUNT)}
            isLoading={isLoading}
            isError={isError}
            skeletonCount={FEATURED_COUNT}
          />
        </section>
      </PageContainer>
    </>
  );
};

export default HomePage;
