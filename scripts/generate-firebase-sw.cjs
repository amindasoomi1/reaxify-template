const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const templatePath = path.resolve(__dirname, "firebase-sw-template.cjs");
const outputPath = path.resolve(
  process.cwd(),
  "public/firebase-messaging-sw.js"
);

let content = fs.readFileSync(templatePath, "utf8");

const replacements = {
  "{APP_DOMAIN_URL}": process.env.VITE_APP_DOMAIN_URL,
  "{API_KEY}": process.env.VITE_FIREBASE_API_KEY,
  "{AUTH_DOMAIN}": process.env.VITE_FIREBASE_AUTH_DOMAIN,
  "{PROJECT_ID}": process.env.VITE_FIREBASE_PROJECT_ID,
  "{STORAGE_BUCKET}": process.env.VITE_FIREBASE_STORAGE_BUCKET,
  "{MESSAGING_SENDER_ID}": process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  "{APP_ID}": process.env.VITE_FIREBASE_APP_ID,
  "{MEASUREMENT_ID}": process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

for (const [key, value] of Object.entries(replacements)) {
  content = content.replace(key, value || "");
}

fs.writeFileSync(outputPath, content, "utf8");
console.log("✅ firebase-messaging-sw.js generated in /public");
