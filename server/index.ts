// server/index.ts
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { connectDB } from "./db";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";

connectDB();

const app = express();

// Capture rawBody for Razorpay webhook
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

(async () => {
  const httpServer = await registerRoutes(app);

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = Number(process.env.PORT) || 5000;
  httpServer.listen(port, "0.0.0.0", () =>
    console.log(`Server running on port ${port}`)
  );
})();
