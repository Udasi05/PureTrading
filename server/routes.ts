// server/routes.ts
import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { isAuthenticated } from "./Auth";
import { razorpay } from "./payment";
import crypto from "crypto";
import { z } from "zod";
import { sendMembershipEmail } from "./email";
// ------------------------------
// ZOD VALIDATION SCHEMAS
// ------------------------------
const signalSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const membershipSchema = z.object({
  planName: z.string().optional(),
  amount: z.number().optional(),
  currency: z.string().optional(),
  paymentId: z.string().optional(),
});

// ------------------------------
export async function setupAuth(_app: Express) {
  // No authentication implemented now
}

// ------------------------------
export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  // ------------------------------
  // AUTH ROUTE
  // ------------------------------
  app.get("/api/auth/user", isAuthenticated, async (_req, res) => {
    return res.status(200).json({ user: null });
  });

  // ------------------------------
  // SIGNALS
  // ------------------------------
  app.get("/api/signals", isAuthenticated, async (_req, res) => {
    try {
      const signals = await storage.getSignals();
      res.json(signals);
    } catch (err) {
      console.error("Error fetching signals:", err);
      res.status(500).json({ message: "Failed to fetch signals" });
    }
  });

  app.get("/api/signals/:id", isAuthenticated, async (req, res) => {
    try {
      const signal = await storage.getSignal(req.params.id);
      if (!signal) return res.status(404).json({ message: "Signal not found" });
      res.json(signal);
    } catch (err) {
      console.error("Error fetching signal:", err);
      res.status(500).json({ message: "Failed to fetch signal" });
    }
  });

  app.post("/api/signals", isAuthenticated, async (req, res) => {
    try {
      const validated = signalSchema.parse(req.body);
      const created = await storage.createSignal(validated);
      res.status(201).json(created);
    } catch (err: any) {
      if (err instanceof z.ZodError)
        return res.status(400).json({ message: "Invalid data", errors: err.errors });

      console.error("Signal create error:", err);
      res.status(500).json({ message: "Failed to create signal" });
    }
  });

  app.patch("/api/signals/:id", isAuthenticated, async (req, res) => {
    try {
      const updated = await storage.updateSignal(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Signal not found" });
      res.json(updated);
    } catch (err) {
      console.error("Update signal error:", err);
      res.status(500).json({ message: "Failed to update signal" });
    }
  });

  // ------------------------------
  // MEMBERSHIPS
  // ------------------------------
  app.get("/api/memberships", isAuthenticated, async (_req, res) => {
    try {
      const userId = "user-id"; // Replace with actual user ID from auth
      const data = await storage.getMemberships(userId);
      res.json(data);
    } catch (err) {
      console.error("Membership fetch error:", err);
      res.status(500).json({ message: "Failed to fetch memberships" });
    }
  });

  app.post("/api/memberships", isAuthenticated, async (req, res) => {
    try {
      const userId = "user-id"; // Replace with actual user ID from auth
      const validated = membershipSchema.parse(req.body);

      const membership = await storage.createMembership({
        userId,
        planName: validated.planName ?? "Pure Trading Membership",
        amount: validated.amount ?? 99,
        currency: validated.currency ?? "INR",
        status: "active",
        paymentId: validated.paymentId ?? "",
      });

      await storage.updateUserMembership(userId, "active");

      res.status(201).json(membership);
    } catch (err: any) {
      if (err instanceof z.ZodError)
        return res.status(400).json({ message: "Invalid membership data", errors: err.errors });

      console.error("Membership create error:", err);
      res.status(500).json({ message: "Failed to create membership" });
    }
  });

  // ------------------------------
  // RAZORPAY ORDER CREATION
  // ------------------------------
  app.post("/api/payment/create-order", async (req: any, res) => {
    console.log("📌 ORDER RECEIVED USERID:", req.body.userId);
    try {
      const amount = req.body.amount ?? 900;

      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt_" + Date.now(),
        notes: { planName: req.body.planName ?? "Pure Trading Membership",
          userId: String(req.body.userId || "")
        },
      });

      console.log("📌 RAZORPAY ORDER NOTES:", order.notes);

      res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      });
    } catch (err) {
      console.error("Order create error:", err);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // ------------------------------
// CREATE USER BEFORE PAYMENT
// ------------------------------
app.post("/api/user/create", async (req, res) => {
  try {
    const { name, email, phone, paymentID } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Create user using email as ID
    const user = await storage.upsertUser({
      id: email,
      email,
      firstName: name,
      phone,
      createdAt: new Date(),
      updatedAt: new Date(),
      paymentID: paymentID
    });

    res.json({ userId: user.id });

  } catch (err) {
    console.error("User create error:", err);
    res.status(500).json({ message: "Failed to create user" });
  }
});

  // ------------------------------
  // RAZORPAY WEBHOOK
  // ------------------------------
  app.post("/api/payment/webhook", async (req: any, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const signature = req.headers["x-razorpay-signature"] as string;

    const expected = crypto
      .createHmac("sha256", secret)
      .update(req.rawBody)
      .digest("hex");

    if (signature !== expected) {
      console.error("Invalid signature");
      return res.status(400).send("Invalid webhook signature");
    }

    const event = req.body;

    if (event.event === "payment.captured") {
      const pay = event.payload.payment.entity;
      console.log("📌 WEBHOOK PAYMENT NOTES:", pay.notes);
      console.log("📌 WEBHOOK USERID:", pay.notes?.userId);

      const userId = pay.notes?.userId;
        if (!userId) {
          console.error("❌ ERROR: Missing userId in Razorpay notes");
        return res.status(400).send("userId missing");
        }


      // Store membership
      await storage.createMembership({
        userId,
        planName: pay.notes?.planName ?? "Pure Trading Membership",
        amount: pay.amount / 100,
        currency: pay.currency,
        status: "active",
        paymentId: pay.id,
      });

      await storage.updateUserMembership(userId, "active", pay.id);


      // --------------------------------
      // SEND EMAIL AFTER SUCCESS PAYMENT
      // --------------------------------
      const userEmail = pay.email; // Razorpay automatically gives email
      await sendMembershipEmail(userEmail, pay.id);

      console.log("🎉 Email sent to:", userEmail);
    }

    res.json({ status: "ok" });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).send("Webhook failed");
  }
});
  // ------------------------------
  // SERVER INSTANCE
  // ------------------------------
  const httpServer = createServer(app);
  return httpServer;
}
