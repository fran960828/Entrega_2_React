/** * PAGE: Favorites
 * Punto de entrada de la ruta Favorites.
 * Actúa como un "Wrapper" agnóstico que renderiza el contenedor del Favorites.
 */

import { Favorites } from "../container/favorites/Favorites";

export function FavoritesPage (){
    return (
        <Favorites/>
    )
}