import { SchemaDefinition } from "mongoose"
import { User, IUser } from "../models/user.model"

export const register = async (user: SchemaDefinition<IUser>): Promise<Boolean> => {
  try {
    const res = await User.create(user);
    console.log(res.username + " is created");
    return res != null;
  } catch (err) {
    throw err;
  }
}

export const login = async (user: SchemaDefinition<IUser>): Promise<IUser|null> => {
  try {
    const res = await User.findOne({ name: user.username, password: user.password });
    res != null && console.log(res.username + " is found");
    return res;
  } catch (err) {
    throw err;
  }
}