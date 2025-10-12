export const generateCustomPassword = (length: number, isMayus: boolean, isMinus: boolean, isNumber: boolean, isSymbol: boolean) => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*(`)_+[]{}|;:,.<>?";

   let charset = "";
   if (isMayus) charset += uppercaseChars;
   if (isMinus) charset += lowercaseChars;
   if (isNumber) charset += numberChars;
   if (isSymbol) charset += symbolChars;

let password = "";
if (isMayus)
    password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
if (isMinus)
    password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
if (isNumber)
    password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
if (isSymbol)
    password += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));

   
   for (let i = password.length; i < length; i++) {
       password += charset.charAt(Math.floor(Math.random() * charset.length));
   }

   password = password.split('').sort(() => 0.5 - Math.random()).join('');
   return password;
};