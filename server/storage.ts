import {
  UserModel,
  SignalModel,
  MembershipModel,
  EconomicEventModel,
  MarketAnalysisModel,
} from "./models";
import type { User } from "@shared/schema";

export class DatabaseStorage {
  // ---------------------------------------------------------
  // USERS
  // ---------------------------------------------------------
  async getUser(id: string): Promise<User | undefined> {
  const doc = await UserModel.findOne({ id }).lean();
  if (!doc) return undefined;

  return {
    id: doc.id,
    email: doc.email ?? null,
    firstName: doc.firstName ?? null,
    lastName: doc.lastName ?? null,
    profileImageUrl: doc.profileImageUrl ?? null,
    isMember: doc.isMember ?? false,
    membershipStartDate: doc.membershipStartDate ?? null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

  async upsertUser(data: any) {
    const user = await UserModel.findOneAndUpdate(
      { id: data.id },
      { ...data, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    return user.toObject();
  }

  async updateUserMembership(userId: string, isMember: boolean) {
    const user = await UserModel.findOneAndUpdate(
      { id: userId },
      {
        isMember,
        membershipStartDate: isMember ? new Date() : null,
        updatedAt: new Date(),
      },
      { new: true }
    );
    return user?.toObject();
  }

  // ---------------------------------------------------------
  // SIGNALS
  // ---------------------------------------------------------
  async getSignals() {
    return await SignalModel.find().sort({ createdAt: -1 }).lean();
  }

  async getSignal(id: string) {
    return await SignalModel.findById(id).lean();
  }

  async createSignal(data: any) {
    return await SignalModel.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async updateSignal(id: string, data: any) {
    return await SignalModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).lean();
  }

  // ---------------------------------------------------------
  // MEMBERSHIPS
  // ---------------------------------------------------------
  async getMemberships(userId: string) {
    return await MembershipModel.find({ userId })
      .sort({ createdAt: -1 })
      .lean();
  }

  async createMembership(data: any) {
    return await MembershipModel.create({
      ...data,
      createdAt: new Date(),
    });
  }

  // ---------------------------------------------------------
  // ECONOMIC EVENTS (FIX)
  // ---------------------------------------------------------
  async getEconomicEvents() {
    return await EconomicEventModel.find()
      .sort({ eventTime: -1 })
      .lean();
  }

  async createEconomicEvent(data: any) {
    return await EconomicEventModel.create({
      ...data,
      createdAt: new Date(),
    });
  }

  // ---------------------------------------------------------
  // MARKET ANALYSIS (FIX)
  // ---------------------------------------------------------
  async getMarketAnalysis() {
    return await MarketAnalysisModel.find()
      .sort({ createdAt: -1 })
      .lean();
  }

  async createMarketAnalysis(data: any) {
    return await MarketAnalysisModel.create({
      ...data,
      createdAt: new Date(),
    });
  }
}

export const storage = new DatabaseStorage();
