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
  phoneNumber: string;
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
    phoneNumber: { type: String },
    profileImageUrl: { type: String, default: null },
    status: { type: String, default: "Not active" },
    membershipStartDate: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const PaymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true, unique: true }, // razorpay payment id
  userId: { type: String, required: true }, // your user id (email or uuid)
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  status: { type: String, default: "captured" }, // captured, failed, refunded...
  rawPayload: { type: mongoose.Schema.Types.Mixed }, // optional full payload for audit
  createdAt: { type: Date, default: Date.now },
});

export const PaymentModel = mongoose.model("Payment", PaymentSchema);

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
