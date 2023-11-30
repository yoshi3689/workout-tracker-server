import { Schema, model } from "mongoose";

export interface ISet {
  rep: number;
  exerciseId: string;
  weight: number;
  rest: number;
}

export const SetSchema = new Schema<ISet>({
  rep: { type: Number, required: true },
  exerciseId: { type: String, required: true },
  weight: { type: Number, required: true },
  rest: { type: Number},
});

export const Set = model(
  "Set", SetSchema
);



