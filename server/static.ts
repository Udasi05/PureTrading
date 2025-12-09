import type { Express } from "express";
import express from "express";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.join(import.meta.dirname, "..", "dist", "public");
  const indexFile = path.join(distPath, "index.html");

  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(indexFile);
  });
}
