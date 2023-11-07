import { Schema, model } from "mongoose";

interface ISet {
  rep: number;
  weight: number;
  rest: number;
}

const SetSchema = new Schema<ISet>({
  rep: { type: Number, required: true },
  weight: { type: Number, required: true },
  rest: { type: Number},
});

export const Set = model(
  "Set", SetSchema
);



