import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const ENC_KEY = Buffer.from(process.env.MASTER_KEY, "base64"); 
const IV_LENGTH = 12; 

export function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, ENC_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  const authTag = cipher.getAuthTag();

  return `${iv.toString("base64")}:${authTag.toString("base64")}:${encrypted}`;
}

export function decrypt(encryptedText) {
  const [ivB64, authTagB64, data] = encryptedText.split(":");
  const iv = Buffer.from(ivB64, "base64");
  const authTag = Buffer.from(authTagB64, "base64");

  const decipher = crypto.createDecipheriv(ALGORITHM, ENC_KEY, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(data, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
