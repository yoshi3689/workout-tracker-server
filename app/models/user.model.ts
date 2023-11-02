import { Schema, model, Types } from "mongoose";

interface IUser {
  username: String;
  email: String;
  password: String;
  createdAt: Date;
  lastActiveAt: Date;
  routines: Types.ObjectId;
  roles: Types.ObjectId
};

const userSchema = new Schema<IUser>({
  // not setting username as a PK
  // cuz it is changeable
  username: String,
  email: String,
  password: String,
  createdAt: Date,
  lastActiveAt: Date,
  routines: {
    type: Schema.Types.ObjectId,
    ref: "routines",
  },
  roles: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
});

export const User = model<IUser>(
  "User", userSchema
);