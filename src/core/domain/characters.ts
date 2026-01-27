interface OriginCharacter {
    name:string,
    link:string
}
interface LocationCharacter extends OriginCharacter{}

export interface Character {
    id:number,
    name:string,
    status:'Alive'|'Dead'|'unknown',
    species:string,
    type:string,
    gender:string,
    origin:OriginCharacter,
    location:LocationCharacter,
    image:string,
    episode:string[],
    url:string,
    created:string
}



