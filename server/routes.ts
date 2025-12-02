import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { isAuthenticated } from "./replitAuth";
import { insertSignalSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = "dev-user";
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/signals", isAuthenticated, async (req, res) => {
    try {
      const signals = await storage.getSignals();
      res.json(signals);
    } catch (error) {
      console.error("Error fetching signals:", error);
      res.status(500).json({ message: "Failed to fetch signals" });
    }
  });

  app.get("/api/signals/:id", isAuthenticated, async (req, res) => {
    try {
      const signal = await storage.getSignal(req.params.id);
      if (!signal) {
        return res.status(404).json({ message: "Signal not found" });
      }
      res.json(signal);
    } catch (error) {
      console.error("Error fetching signal:", error);
      res.status(500).json({ message: "Failed to fetch signal" });
    }
  });

  app.post("/api/signals", isAuthenticated, async (req: any, res) => {
    try {
      const validatedData = insertSignalSchema.parse(req.body);
      const signal = await storage.createSignal(validatedData);
      res.status(201).json(signal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid signal data", errors: error.errors });
      }
      console.error("Error creating signal:", error);
      res.status(500).json({ message: "Failed to create signal" });
    }
  });

  app.patch("/api/signals/:id", isAuthenticated, async (req: any, res) => {
    try {
      const signal = await storage.updateSignal(req.params.id, req.body);
      if (!signal) {
        return res.status(404).json({ message: "Signal not found" });
      }
      res.json(signal);
    } catch (error) {
      console.error("Error updating signal:", error);
      res.status(500).json({ message: "Failed to update signal" });
    }
  });

  app.get("/api/memberships", isAuthenticated, async (req: any, res) => {
    try {
      const userId = "dev-user";
      const memberships = await storage.getMemberships(userId);
      res.json(memberships);
    } catch (error) {
      console.error("Error fetching memberships:", error);
      res.status(500).json({ message: "Failed to fetch memberships" });
    }
  });

  app.post("/api/memberships", isAuthenticated, async (req: any, res) => {
    try {
      const userId = "dev-user";
      const membership = await storage.createMembership({
        userId,
        planName: req.body.planName || "Pure Trading Membership",
        amount: req.body.amount || 9,
        currency: req.body.currency || "INR",
        status: "active",
        paymentId: req.body.paymentId,
      });
      
      await storage.updateUserMembership(userId, true);
      
      res.status(201).json(membership);
    } catch (error) {
      console.error("Error creating membership:", error);
      res.status(500).json({ message: "Failed to create membership" });
    }
  });

  app.get("/api/economic-events", isAuthenticated, async (req, res) => {
    try {
      const events = await storage.getEconomicEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching economic events:", error);
      res.status(500).json({ message: "Failed to fetch economic events" });
    }
  });

  app.get("/api/market-analysis", isAuthenticated, async (req, res) => {
    try {
      const analysis = await storage.getMarketAnalysis();
      res.json(analysis);
    } catch (error) {
      console.error("Error fetching market analysis:", error);
      res.status(500).json({ message: "Failed to fetch market analysis" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

export async function setupAuth(app: Express) {
  // no auth in production for now (accepting app for future use)
}
