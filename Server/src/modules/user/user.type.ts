
// =========================
// CORE ROLE SYSTEM (RBAC)
// =========================
export type UserRole = "buyer" | "supplier" | "both" | "admin";

// =========================
// CONSENT (POPIA)
// =========================
export interface IConsent {
  version: string;
  acceptedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  purposes: {
    marketing: boolean;
    analytics: boolean;
    marketplaceActivity: boolean;
  };
}

// =========================
// LOCATION (MINIMISED DATA)
// =========================
export interface ILocation {
  city?: string;
  province?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  precision: "city" | "approximate" | "exact";
}

// =========================
// MAIN USER ENTITY
// =========================
export interface IUser {
  fullName: string;
  email: string;
  phone?: string;

  passwordHash: string;

  role: UserRole;

  consent: IConsent;

  location?: ILocation;

  visibility: {
    profilePublic: boolean;
    showContactInfo: boolean;
    showLocation: boolean;
  };

  retention?: {
    deleteAt?: Date;
    inactiveSince?: Date;
  };

  security: {
    lastLogin?: Date;
    loginAttempts: number;
    lockedUntil?: Date;
    mfaEnabled: boolean;
  };

  isDeleted: boolean;
}

// =========================
// MONGOOSE DOCUMENT METHODS
// =========================
export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// =========================
// MODEL TYPE (IMPORTANT FOR TS + MONGOOSE)
// =========================
import { Model } from "mongoose";

export type UserModel = Model<IUser, {}, IUserMethods>;