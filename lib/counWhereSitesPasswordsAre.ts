import type { Element } from "./generated/prisma";

export function countWhereSitesPasswordsAre(elements: Element[]) {
    const creditCards = elements.filter((element) => element.typeElement === "Tarjeta").length || 0
    const work = elements.filter((element) => element.directory === "Work").length || 0
    const shopping = elements.filter((element) => element.directory === "Shopping").length || 0
    const entreteniment = elements.filter((element) => element.directory === "Entreteniment").length || 0
    const social = elements.filter((element) => element.directory === "Social").length || 0
    

   
return {creditCards, work, shopping, entreteniment, social};
}
