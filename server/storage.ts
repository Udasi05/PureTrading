import {
  UserModel,
  SignalModel,
  MembershipModel,
  PaymentModel,
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
    phone: doc.phoneNumber,
    profileImageUrl: doc.profileImageUrl ?? null,
    status: doc.status ?? "Not active",
    membershipStartDate: doc.membershipStartDate ?? null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

async upsertUser(data: {
  id: string;
  email: string;
  firstName?: string;
  phone?: string;
  membership?: string;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  const user = await UserModel.findOneAndUpdate(
    { id: data.id },
    { ...data, updatedAt: new Date() },
    { new: true, upsert: true }
  );

  return user.toObject();
}


// // create payment record
// async createPaymentRecord(data: {
//   paymentId: string;
//   userId: string;
//   amount: number;
//   currency?: string;
//   status?: string;
//   rawPayload?: any;
// }) {
//   return await PaymentModel.create({
//     paymentId: data.paymentId,
//     userId: data.userId,
//     amount: data.amount,
//     currency: data.currency ?? "INR",
//     status: data.status ?? "captured",
//     rawPayload: data.rawPayload ?? {},
//     createdAt: new Date(),
//   });
// }

// // get payment by id
// async getPaymentById(paymentId: string) {
//   return await PaymentModel.findOne({ paymentId }).lean();
// }


//   async upsertUser(data: any) {
//     const user = await UserModel.findOneAndUpdate(
//       { id: data.id },
//       { ...data, updatedAt: new Date() },
//       { new: true, upsert: true }
//     );
//     return user.toObject();
//   }

//   async updateUserMembership(userId: string, status: String, paymentId?: string) {
//   const user = await UserModel.findOneAndUpdate(
//     { id: userId },
//     {
//       status: status,
//       membershipStartDate: status ? new Date() : null,
//       lastPaymentId: paymentId ?? null,     // NEW
//       updatedAt: new Date(),
//     },
//     { new: true }
//   );
//   return user?.toObject();
// }


  // ---------------------------------------------------------
  // SIGNALS
  // ---------------------------------------------------------
  // async getSignals() {
  //   return await SignalModel.find().sort({ createdAt: -1 }).lean();
  // }

  // async getSignal(id: string) {
  //   return await SignalModel.findById(id).lean();
  // }

  // async createSignal(data: any) {
  //   return await SignalModel.create({
  //     ...data,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });
  // }

  // async updateSignal(id: string, data: any) {
  //   return await SignalModel.findByIdAndUpdate(
  //     id,
  //     { ...data, updatedAt: new Date() },
  //     { new: true }
  //   ).lean();
  // }

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
}


export const storage = new DatabaseStorage();
