import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  username: string;
  email: string;
  password: string;
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