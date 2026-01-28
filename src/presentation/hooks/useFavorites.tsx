import { useState, useEffect } from "react";

export const useFavorites = (storageKey: string, itemId: number) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Comprobar si es favorito al cargar
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setIsFavorite(favorites.some((favId: number) => favId === itemId));
  }, [itemId, storageKey]);

  const toggleFavorite = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const favorites = JSON.parse(localStorage.getItem(storageKey) || "[]");
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((favId: number) => favId !== itemId);
    } else {
      newFavorites = [...favorites, itemId];
    }

    localStorage.setItem(storageKey, JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return { isFavorite, toggleFavorite };
};