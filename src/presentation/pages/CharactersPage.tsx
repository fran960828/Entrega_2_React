/** * PAGE: Characters
 * Punto de entrada de la ruta Characters.
 * Actúa como un "Wrapper" agnóstico que renderiza el contenedor del Characters.
 */

import { Character } from "../container/characters/Character";

export default function CharactersPage(){
    return (
        <Character/>
    )
}