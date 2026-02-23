/** * ROUTER CONFIGURATION: app.router.tsx
 * Centraliza toda la lógica de navegación y lazy loading.
 */
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./shared/components/Layout";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";
import { Dashboard } from "./dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element:<Dashboard/>
      },
      {
        path: "/characters",
        async lazy() {
          const { Character } = await import("./characters/Character");
          const { charactersLoader } = await import("./characters/loaders/loaders.character");
          return { Component: Character, loader: charactersLoader };
        },
      },
      {
        path: "/characters/:id",
        async lazy() {
          const { CharacterDetail } = await import("./characters/characterDetail");
          const { characterIdLoader } = await import("./characters/loaders/loaders.CharacterDetail");
          return { Component: CharacterDetail, loader: characterIdLoader };
        },
      },
      {
        path: "/episodes",
        async lazy() {
          const { Episodes } = await import("./episodes/Episodes");
          const { episodesLoader } = await import("./episodes/loaders/loaders.episode");
          return { Component: Episodes, loader: episodesLoader };
        },
      },
      {
        path: "/locations",
        async lazy() {
          const { Locations } = await import("./locations/Locations");
          const { locationsLoader } = await import("./locations/loaders/loaders.location");
          return { Component: Locations, loader: locationsLoader };
        },
      },
      {
        path: "/favorites",
        async lazy() {
          const { Favorites } = await import("./favorites/Favorites");
          const {favoritesLoader}=await import ("./favorites/loaders")
          return { Component: Favorites,loader:favoritesLoader };
        },
      },
    ],
  },
]);