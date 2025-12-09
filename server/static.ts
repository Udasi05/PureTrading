import type { Express } from "express";
import express from "express";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.join(process.cwd(), "dist", "public");  // FIXED PATH
  const indexFile = path.join(distPath, "index.html");          // FIXED PATH

  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(indexFile);
  });
}
