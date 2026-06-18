// Petit serveur de développement, sans dépendance.
// Sert le dossier /dist avec gestion des URLs « jolies » (dossiers/index.html).

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");
const PORT = process.env.PORT || 4321;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split("?")[0]);
  let file = path.join(DIST, p);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, "index.html");
  } else if (!path.extname(file)) {
    file = path.join(DIST, p, "index.html");
  }
  return file;
}

http
  .createServer((req, res) => {
    let file = resolveFile(req.url);
    if (!fs.existsSync(file)) {
      file = path.join(DIST, "404.html");
      res.statusCode = 404;
    }
    const type = TYPES[path.extname(file)] || "application/octet-stream";
    res.setHeader("Content-Type", type);
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => {
    console.log(`→ Serveur de développement : http://localhost:${PORT}`);
  });
