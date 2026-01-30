/** * PAGE: CharacterDetails
 * Punto de entrada de la ruta CharacterDetails.
 * Actúa como un "Wrapper" agnóstico que renderiza el contenedor del CharacterDetails.
 */

import { CharacterDetail } from "../container/characterDetail/CharacterDetail";

export function CharacterDetailPage(){
    return (
        <CharacterDetail/>
    )
}