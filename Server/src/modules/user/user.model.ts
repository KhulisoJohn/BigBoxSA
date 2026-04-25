import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

import { IUser, IUserMethods, UserModel } from "./user.type";

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    fullName: { type: String, required: true, index: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    phone: { type: String },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["buyer", "supplier", "both", "admin"],
      default: "both",
    },

    consent: {
      version: { type: String, required: true },
      acceptedAt: { type: Date, default: Date.now },
      ipAddress: String,
      userAgent: String,
      purposes: {
        marketing: { type: Boolean, default: false },
        analytics: { type: Boolean, default: false },
        marketplaceActivity: { type: Boolean, default: true },
      },
    },

    location: {
      city: String,
      province: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
      precision: {
        type: String,
        enum: ["city", "approximate", "exact"],
        default: "approximate",
      },
    },

    visibility: {
      profilePublic: { type: Boolean, default: true },
      showContactInfo: { type: Boolean, default: false },
      showLocation: { type: Boolean, default: true },
    },

    retention: {
      deleteAt: Date,
      inactiveSince: Date,
    },

    security: {
      lastLogin: Date,
      loginAttempts: { type: Number, default: 0 },
      lockedUntil: Date,
      mfaEnabled: { type: Boolean, default: false },
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User: UserModel =
  mongoose.models.User || mongoose.model<IUser, UserModel>("User", UserSchema);