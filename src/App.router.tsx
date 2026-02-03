/** * ROUTER CONFIGURATION: app.router.tsx
 * Centraliza toda la lógica de navegación y lazy loading.
 */
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./presentation/layout/rootLayout";
import ErrorPage from "./presentation/components/ErrorAlert";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        async lazy() {
          const { default: HomePage } = await import("./presentation/pages/HomePage");
          return { Component: HomePage };
        },
      },
      {
        path: "/characters",
        async lazy() {
          const { default: CharactersPage } = await import("./presentation/pages/CharactersPage");
          const { charactersLoader } = await import("./loaders/loaders.character");
          return { Component: CharactersPage, loader: charactersLoader };
        },
      },
      {
        path: "/characters/:id",
        async lazy() {
          const { CharacterDetailPage } = await import("./presentation/pages/CharactersDetailPage");
          const { characterIdLoader } = await import("./loaders/loaders.CharacterDetail");
          return { Component: CharacterDetailPage, loader: characterIdLoader };
        },
      },
      {
        path: "/episodes",
        async lazy() {
          const { EpisodesPage } = await import("./presentation/pages/EpisodesPage");
          const { episodesLoader } = await import("./loaders/loaders.episode");
          return { Component: EpisodesPage, loader: episodesLoader };
        },
      },
      {
        path: "/locations",
        async lazy() {
          const { default: LocationsPage } = await import("./presentation/pages/LocationsPage");
          const { locationsLoader } = await import("./loaders/loaders.location");
          return { Component: LocationsPage, loader: locationsLoader };
        },
      },
      {
        path: "/favorites",
        async lazy() {
          const { FavoritesPage } = await import("./presentation/pages/FavoritesPage");
          return { Component: FavoritesPage };
        },
      },
    ],
  },
]);