const fs = require("fs");
const path = require("path");

const filePath = path.resolve("./src/types/api.ts");

try {
  let content = fs.readFileSync(filePath, "utf8");
  // Remove all "?" from property definitions like "name?: string"
  content = content.replace(/(\w+)\?:/g, "$1:");
  fs.writeFileSync(filePath, content, "utf8");
  console.log("✅ Successfully removed all optional properties!");
} catch (err) {
  console.error("❌ Error while processing file:", err.message);
}
