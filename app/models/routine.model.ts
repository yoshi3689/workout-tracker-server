import { Schema, model } from "mongoose";
import { ExerciseSchema } from "./exercise.model"

export interface IRoutine {
  name: string;
  username: string;
  createdAt: Date;
  isEditing: boolean;
  exercises: [typeof ExerciseSchema];
}

const RoutineSchema = new Schema<IRoutine>({
  name: { type: String },
  username: String,
  createdAt: Date,
  isEditing: Boolean,
  exercises: { type: [Schema.Types.ObjectId] }
});

export const Routine = model(
  "Routine", RoutineSchema
);



