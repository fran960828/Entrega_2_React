/** * CONFIG: Dependency Injection
 * Punto de composición de la arquitectura.
 * Une los Casos de Uso con sus implementaciones reales (Infraestructura)
 * para ser consumidos por la capa de Presentación.
 */

import {
  getAllCharacter,
  getAllEpisodes,
  getAllLocations,
  getCharacter,
  getSomeCharacters,
  getSomeEpisodes,
} from "../core/Application/use-cases";
import { getCharacterImpl } from "../core/infraestructure/CharacterImpl";
import { getEpisodeImpl } from "../core/infraestructure/EpisodeImpl";
import { getLocationImpl } from "../core/infraestructure/LocationImpl";

// Personajes
export const getCharacterUI = getCharacter(getCharacterImpl);
export const getSomeCharactersUI = getSomeCharacters(getCharacterImpl);
export const getAllCharactersUI = getAllCharacter(getCharacterImpl);

// --- UBICACIONES ---
// Refactorizado para asegurar que recibe el objeto { page } y lo pasa al caso de uso
export const getAllLocationsUI = getAllLocations(getLocationImpl);

// Debería decir "function"
// --- EPISODIOS ---
// Refactorizado siguiendo el mismo patrón de objeto de filtros
export const getSomeEpisodesUI = getSomeEpisodes(getEpisodeImpl);
export const getAllEpisodesUI = getAllEpisodes(getEpisodeImpl);
/*
1. domain (La Definición)
Define o modifica la interfaz del objeto, es decir, la estructura y tipología de datos que nos va proporcionar la API.
                                
2. Application/ports (El Contrato)
Establece la estructura del método que necesitas para obtener los datos de la API en forma de promesa.

3. Application/use-cases (La Lógica)
Crea la función que orquesta el movimiento. Recibe el Port por parámetro y ejecuta su método.

4. infrastructure/Impl (La Realidad)
Implementa la lógica real de fetch o httpClient construyendo la url y cumpliendo con el Port.

5. config/dependencies (La Conexión)
Inyecta la implementación (Impl) en el use-case y expórtalo como una función UI.

*/
