import { Film } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-muted/30">
      <Separator />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-blue-600" />

            <span className="font-semibold">
              CineSpoilerS
            </span>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Discover movies, explore details and prepare for your next cinema experience.
          </p>

          <p className="text-sm text-muted-foreground">
            © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
