/** * DOMAIN ENTITY: Episode
 * Representa la estructura central de una localización en el multiverso.
 */

export interface LocationModel {
    id:number,
    name:string,
    type:string,
    dimension:string,
    residents:string[],//lista de endpoints de personajes que residen en la localización
    url:string,
    created:string
}







