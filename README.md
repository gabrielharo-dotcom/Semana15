## Evidencias del Laboratorio:
### Integrante: Haro Vargas Gabriel
1. Clonar repositorio
![1](<DOCS/Clonar - Gabriel Haro.png>)

2. Levantar proyecto
![2](<DOCS/Correr - Gabriel Haro.png>)

3. Consumir data de TMDB

- Aparece las películas con sus portadas y títulos de TMDB.
![3](<DOCS/Consumir - Gabriel Haro.png>)

- Confirmamos el consumo de la API con DevTools del navegador.
![4](<DOCS/ConsumirJson - Gabriel Haro.png>)

4. Implementar estado global (Zustand)

- Damos click en agregar película y se agrega en el carrito.
![5](<DOCS/Agregar - Gabriel Haro.png>)

- Confirmamos que se agregó con el comando "localStorage.getItem('cinespoilers-cart')" en la console de DevTools del navegador.
![6](<DOCS/AgregarConsole - Gabriel Haro.png>)

5. Desarrollar todas los pages

- Estructura de la carpeta Pages.
![7](<DOCS/Pages - Gabriel Haro.png>)

- Página de la lista de películas.
![8](<DOCS/Movies - Gabriel Haro.png>)

- Página de los detalles de las películas.
![9](<DOCS/Detalles - Gabriel Haro.png>)

- Página del carrito de compras.
![10](<DOCS/Carrito - Gabriel Haro.png>)

- Página del historial de compras.
![11](<DOCS/Historial - Gabriel Haro.png>)

6. Agregar pasarela de pagos de película comprada (Simulación)

- Procedemos al pago por las entradas.
![12](<DOCS/Pago - Gabriel Haro.png>)
![13](<DOCS/Procesando - Gabriel Haro.png>)

- Pago exitoso por las entradas.
![14](<DOCS/PagoEx - Gabriel Haro.png>)

7. Agregar tests al proyecto

- Test del proyecto en la consola de VisualStudio.
![15](<DOCS/Tests - Gabriel Haro.png>)

### Integrante: Quintana, Rony
1. Clonar repositorio
![1](<docs-Quintana/PrimeroEvidencia.png>)

2. Levantar proyecto

- Instalación de dependencias y ejecución con Vite. Se visualiza la página de inicio de CineSpoilerS corriendo en `localhost:5173`.
![2](<docs-Quintana/SegundaEvidencia.png>)

3. Consumir data de TMDB

- Configuración de las variables de entorno (`VITE_TMDB_API_KEY`, `VITE_TMDB_BASE_URL`, `VITE_TMDB_IMAGE_BASE_URL`) y listado de películas destacadas obtenidas desde la API de TMDB.
![3](<docs-Quintana/TerceraEvidencia.png>)

4. Implementar estado global (Zustand)

- Store del carrito (`cart-store.ts`) con `addItem`, `removeItem`, `updateQuantity` y `clearCart`, persistido con `zustand/middleware`. Se refleja el contador de productos agregados en el ícono del carrito.
![4](<docs-Quintana/CuartaEvidencia.png>)

- Página de Checkout, donde se consume el estado global de Zustand para mostrar las entradas seleccionadas, la cantidad, el total y procesar el pago simulado.
![4.1](<docs-Quintana/Zustand.png>)

5. Desarrollar todas las pages

- Página de la lista de películas (`movies-page.tsx`), mostrando el grid de películas populares con paginación.
![5](<docs-Quintana/QuintaEvidencia!page-movie!.png>)

- Página de detalles de película (`movie-detail-page.tsx`), mostrando la información del título seleccionado y el botón para agregar al carrito.
![6](<docs-Quintana/QuintaEvidencia!page-details!.png>)

6. Agregar tests al proyecto

- Ejecución de `npm run test` en la consola de VisualStudio Code: 2 archivos de test y 14 pruebas superadas correctamente (`movies-service.test.ts` y `cart-store.test.ts`).
![7](<docs-Quintana/SextaEvidencia.png>)

### integrante Oscar Olano Paniora

1. Clonar repositorio
![1](<DOCS/clonar repositorio-OSCAR OLANO.jpg>)

2. Levantar proyecto
![2](<DOCS/Levantar proyecto-Oscar olano.jpg>)

3. Consumir data de TMDB

- Aparece las películas con sus portadas y títulos de TMDB.
![3](<DOCS/CONSUMO DE TMDB-Oscar olano.jpg>)


4. Implementar estado global (Zustand)

- Damos click en agregar película y se agrega en el carrito.
![4](<DOCS/Implemetacion de zustand-Oscar olano.jpg>)

5. Desarrollar todas los pages
![5](<DOCS/desarrollo de todas las paginas 1 -Oscar olano.jpg>)
![6](<DOCS/desarrollo de todas las paginas.jpg>)

6. Agregar pasarela de pagos de película comprada (Simulación)
![7](<DOCS/Pasarela de pago 1 -OSCAR OLANO.jpg>)

![8](<DOCS/Pasarela de pago 2-OSCAR OLANO.jpg>)

