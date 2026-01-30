/** * DOMAIN ENTITY: Episode
 * Representa la estructura central de un episodio en el multiverso.
 */

export interface Episode{
    id:number,
    name:string,
    air_date:string,
    episode:string,
    characters:string[],// Lista de endpoints de personajes del episodio
    url:string,
    created:string

}

