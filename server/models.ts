// server/models.ts
import mongoose, { Schema, Document, Model } from "mongoose";

/* =========================================================
   USER
   (matches @shared/schema users table)
   ========================================================= */

export interface IUser extends Document {
  id: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
  status: string;
  membershipStartDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    profileImageUrl: { type: String, default: null },
    status: { type: String, default: "Not active" },
    membershipStartDate: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const UserModel: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

/* =========================================================
   SIGNAL
   (matches your signals fields)
   ========================================================= */

export interface ISignal extends Document {
  instrument: string;
  instrumentType: string;
  session: string;
  direction: string;
  entryPrice: string;
  stopLoss: string;
  takeProfit1: string;
  takeProfit2?: string;
  takeProfit3?: string;
  lotSize: string;
  riskReward?: string;
  rationale?: string;
  status: string;
  result?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SignalSchema = new Schema<ISignal>(
  {
    instrument: { type: String, required: true },
    instrumentType: { type: String, required: true },
    session: { type: String, required: true },
    direction: { type: String, required: true },
    entryPrice: { type: String, required: true },
    stopLoss: { type: String, required: true },
    takeProfit1: { type: String, required: true },
    takeProfit2: { type: String },
    takeProfit3: { type: String },
    lotSize: { type: String, required: true },
    riskReward: { type: String },
    rationale: { type: String },
    status: { type: String, default: "active" },
    result: { type: String },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const SignalModel: Model<ISignal> =
  (mongoose.models.Signal as Model<ISignal>) ||
  mongoose.model<ISignal>("Signal", SignalSchema);

/* =========================================================
   MEMBERSHIP
   ========================================================= */

export interface IMembership extends Document {
  userId: string;
  planName: string;
  amount: number;
  currency: string;
  status: string;
  paymentId?: string;
  createdAt: Date;
}

const MembershipSchema = new Schema<IMembership>(
  {
    userId: { type: String, required: true, index: true },
    planName: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, default: "active" },
    paymentId: { type: String },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

export const MembershipModel: Model<IMembership> =
  (mongoose.models.Membership as Model<IMembership>) ||
  mongoose.model<IMembership>("Membership", MembershipSchema);

/* =========================================================
   ECONOMIC EVENT
   ========================================================= */

export interface IEconomicEvent extends Document {
  title: string;
  currency: string;
  impact: string;
  forecast?: string;
  previous?: string;
  actual?: string;
  eventTime: Date;
  createdAt: Date;
}

const EconomicEventSchema = new Schema<IEconomicEvent>(
  {
    title: { type: String, required: true },
    currency: { type: String, required: true },
    impact: { type: String, required: true },
    forecast: { type: String },
    previous: { type: String },
    actual: { type: String },
    eventTime: { type: Date, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

export const EconomicEventModel: Model<IEconomicEvent> =
  (mongoose.models.EconomicEvent as Model<IEconomicEvent>) ||
  mongoose.model<IEconomicEvent>("EconomicEvent", EconomicEventSchema);

/* =========================================================
   MARKET ANALYSIS
   ========================================================= */

export interface IMarketAnalysis extends Document {
  instrument: string;
  instrumentType: string;
  title: string;
  analysis: string;
  sentiment?: string;
  keyLevels?: string;
  createdAt: Date;
}

const MarketAnalysisSchema = new Schema<IMarketAnalysis>(
  {
    instrument: { type: String, required: true },
    instrumentType: { type: String, required: true },
    title: { type: String, required: true },
    analysis: { type: String, required: true },
    sentiment: { type: String },
    keyLevels: { type: String },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

export const MarketAnalysisModel: Model<IMarketAnalysis> =
  (mongoose.models.MarketAnalysis as Model<IMarketAnalysis>) ||
  mongoose.model<IMarketAnalysis>("MarketAnalysis", MarketAnalysisSchema);
