import { Schema, model } from "mongoose";
import { ExerciseSchema } from "./exercise.model"

interface IRoutine {
  name: string;
  createdAt: Date;
  exercises: [typeof ExerciseSchema];
}

const RoutineSchema = new Schema<IRoutine>({
  name: { type: String },
  createdAt: Date,
  exercises: { type: [Schema.Types.ObjectId] }
});

export const Routine = model(
  "Routine", RoutineSchema
);



