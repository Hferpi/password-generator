import type { Element } from "./generated/prisma";

export function countPasswords(elements: Element[]) {
    const passwordCount = new Map<string, number>();
    
    elements.forEach((element) => {
    const password = element.password;
    if (password){
        if (passwordCount.has(password)) {
            passwordCount.set(password, (passwordCount.get(password) || 0) + 1);
        } else {
            passwordCount.set(password, 1);
        }
    }
})
let uniquePasswords = 0
let repeatedPasswordsCount= 0

passwordCount.forEach((count) => {
    if (count === 1) {
        uniquePasswords++;
    } else {
        repeatedPasswordsCount++;
    }
})
return {unique: uniquePasswords, repeated: repeatedPasswordsCount};
}