import { Schema, model, Types, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  createdAt: Date;
  lastActiveAt: Date;
  isEmailVerified: boolean;
  routines: Types.ObjectId;
  roles: Types.ObjectId
};

const userSchema = new Schema<IUser>({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: {type: String, required: true},
  refreshToken: String,
  createdAt: Date,
  lastActiveAt: Date,
  isEmailVerified: { type: Boolean, default: false },
  routines: {
    type: Schema.Types.ObjectId,
    ref: "routines",
  },
  roles: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
});


const saltRounds = 8

userSchema.pre('save', async function (next) {
 const user = this;
  if (user.isModified('password')) {
   user.password = await bcrypt.hash(user.password, saltRounds);
 }
 next();
});

export const User = model<IUser>(
  "User", userSchema
);