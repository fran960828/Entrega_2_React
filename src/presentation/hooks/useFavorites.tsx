/** * HOOK: useFavorites
 * Gestiona la lógica de persistencia de favoritos en LocalStorage.
 * Implementa comunicación reactiva mediante eventos globales para sincronizar 
 * diferentes partes de la UI en tiempo real.
 * * @param {string} storageKey - Clave del LocalStorage ('favCharacters' | 'favEpisodes').
 * @param {number} itemId - ID del elemento a gestionar.
 */

import { useState, useEffect } from "react";

export const useFavorites = (storageKey: string, itemId: number) => {
  const [isFavorite, setIsFavorite] = useState(false);

  /** Sincronización inicial: Verifica el estado en el almacenamiento al montar el componente */
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setIsFavorite(favorites.some((favId: number) => favId === itemId));
  }, [itemId, storageKey]);

  /** * Alterna el estado de favorito y notifica al resto de la aplicación.
   * @param {React.MouseEvent} [e] - Evento opcional para detener la propagación en UI.
   */
  const toggleFavorite = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation(); // Evita disparar eventos de navegación al hacer click en el corazón
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

    /** * DISPATCH EVENT: Notifica a otros componentes (como FavoritesContainer) 
     * que el almacenamiento ha cambiado, forzando su re-renderizado.
     */
    window.dispatchEvent(new Event("storage"));
  };

  return { isFavorite, toggleFavorite };
};