import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table for  Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for  Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  status: varchar("status").default("Not active"),
  membershipStartDate: timestamp("membership_start_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  memberships: many(memberships),
}));

// Memberships table
export const memberships = pgTable("memberships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  planName: varchar("plan_name").notNull(),
  amount: integer("amount").notNull(),
  currency: varchar("currency").default("INR"),
  status: varchar("status").default("active"),
  paymentId: varchar("payment_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const membershipsRelations = relations(memberships, ({ one }) => ({
  user: one(users, {
    fields: [memberships.userId],
    references: [users.id],
  }),
}));

// Trading signals table
export const signals = pgTable("signals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  instrument: varchar("instrument").notNull(),
  instrumentType: varchar("instrument_type").notNull(),
  session: varchar("session").notNull(),
  direction: varchar("direction").notNull(),
  entryPrice: varchar("entry_price").notNull(),
  stopLoss: varchar("stop_loss").notNull(),
  takeProfit1: varchar("take_profit_1").notNull(),
  takeProfit2: varchar("take_profit_2"),
  takeProfit3: varchar("take_profit_3"),
  lotSize: varchar("lot_size").notNull(),
  riskReward: varchar("risk_reward"),
  rationale: text("rationale"),
  status: varchar("status").default("active"),
  result: varchar("result"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Economic calendar events
export const economicEvents = pgTable("economic_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  currency: varchar("currency").notNull(),
  impact: varchar("impact").notNull(),
  forecast: varchar("forecast"),
  previous: varchar("previous"),
  actual: varchar("actual"),
  eventTime: timestamp("event_time").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Market analysis
export const marketAnalysis = pgTable("market_analysis", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  instrument: varchar("instrument").notNull(),
  instrumentType: varchar("instrument_type").notNull(),
  title: varchar("title").notNull(),
  analysis: text("analysis").notNull(),
  sentiment: varchar("sentiment"),
  keyLevels: text("key_levels"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas and types
export const insertUserSchema = createInsertSchema(users).omit({ createdAt: true, updatedAt: true });
export const insertMembershipSchema = createInsertSchema(memberships).omit({ id: true, createdAt: true });
export const insertSignalSchema = createInsertSchema(signals).omit({ id: true, createdAt: true, updatedAt: true });
export const insertEconomicEventSchema = createInsertSchema(economicEvents).omit({ id: true, createdAt: true });
export const insertMarketAnalysisSchema = createInsertSchema(marketAnalysis).omit({ id: true, createdAt: true });

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Membership = typeof memberships.$inferSelect;
export type InsertMembership = z.infer<typeof insertMembershipSchema>;

export type Signal = typeof signals.$inferSelect;
export type InsertSignal = z.infer<typeof insertSignalSchema>;

export type EconomicEvent = typeof economicEvents.$inferSelect;
export type InsertEconomicEvent = z.infer<typeof insertEconomicEventSchema>;

export type MarketAnalysis = typeof marketAnalysis.$inferSelect;
export type InsertMarketAnalysis = z.infer<typeof insertMarketAnalysisSchema>;
