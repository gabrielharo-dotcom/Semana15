import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Tras cada test desmontamos el árbol de React y limpiamos el DOM, para que
// un test no contamine al siguiente.
afterEach(() => {
  cleanup();
});
