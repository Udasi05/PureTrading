// server/static.ts
import type { Express } from "express";
import express from "express";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.join(process.cwd(), "dist");
  const indexFile = path.join(distPath, "index.html");

  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(indexFile);
  });
}
