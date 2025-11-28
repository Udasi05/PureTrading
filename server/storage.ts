import {
  users,
  signals,
  memberships,
  economicEvents,
  marketAnalysis,
  type User,
  type UpsertUser,
  type Signal,
  type InsertSignal,
  type Membership,
  type InsertMembership,
  type EconomicEvent,
  type InsertEconomicEvent,
  type MarketAnalysis,
  type InsertMarketAnalysis,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserMembership(userId: string, isMember: boolean): Promise<User | undefined>;
  
  getSignals(): Promise<Signal[]>;
  getSignal(id: string): Promise<Signal | undefined>;
  createSignal(signal: InsertSignal): Promise<Signal>;
  updateSignal(id: string, signal: Partial<Signal>): Promise<Signal | undefined>;
  
  getMemberships(userId: string): Promise<Membership[]>;
  createMembership(membership: InsertMembership): Promise<Membership>;
  
  getEconomicEvents(): Promise<EconomicEvent[]>;
  createEconomicEvent(event: InsertEconomicEvent): Promise<EconomicEvent>;
  
  getMarketAnalysis(): Promise<MarketAnalysis[]>;
  createMarketAnalysis(analysis: InsertMarketAnalysis): Promise<MarketAnalysis>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserMembership(userId: string, isMember: boolean): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ 
        isMember, 
        membershipStartDate: isMember ? new Date() : null,
        updatedAt: new Date() 
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async getSignals(): Promise<Signal[]> {
    return await db.select().from(signals).orderBy(desc(signals.createdAt));
  }

  async getSignal(id: string): Promise<Signal | undefined> {
    const [signal] = await db.select().from(signals).where(eq(signals.id, id));
    return signal;
  }

  async createSignal(signal: InsertSignal): Promise<Signal> {
    const [newSignal] = await db.insert(signals).values(signal).returning();
    return newSignal;
  }

  async updateSignal(id: string, signalData: Partial<Signal>): Promise<Signal | undefined> {
    const [signal] = await db
      .update(signals)
      .set({ ...signalData, updatedAt: new Date() })
      .where(eq(signals.id, id))
      .returning();
    return signal;
  }

  async getMemberships(userId: string): Promise<Membership[]> {
    return await db
      .select()
      .from(memberships)
      .where(eq(memberships.userId, userId))
      .orderBy(desc(memberships.createdAt));
  }

  async createMembership(membership: InsertMembership): Promise<Membership> {
    const [newMembership] = await db.insert(memberships).values(membership).returning();
    return newMembership;
  }

  async getEconomicEvents(): Promise<EconomicEvent[]> {
    return await db.select().from(economicEvents).orderBy(desc(economicEvents.eventTime));
  }

  async createEconomicEvent(event: InsertEconomicEvent): Promise<EconomicEvent> {
    const [newEvent] = await db.insert(economicEvents).values(event).returning();
    return newEvent;
  }

  async getMarketAnalysis(): Promise<MarketAnalysis[]> {
    return await db.select().from(marketAnalysis).orderBy(desc(marketAnalysis.createdAt));
  }

  async createMarketAnalysis(analysis: InsertMarketAnalysis): Promise<MarketAnalysis> {
    const [newAnalysis] = await db.insert(marketAnalysis).values(analysis).returning();
    return newAnalysis;
  }
}

export const storage = new DatabaseStorage();
