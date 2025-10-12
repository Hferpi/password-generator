import { generateRandomUsername } from "./generateRandomUser";

export const generateRandomEmail = () => {
    const domains = [
        "example.com",
        "mail.com",
        "test.com",
        "demo.com",
    ];

const username = generateRandomUsername(8);
const domain = domains[Math.floor(Math.random() * domains.length)];

return `${username}@${domain}`;
    
}