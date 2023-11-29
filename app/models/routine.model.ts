import { Schema, model } from "mongoose";
import { ExerciseSchema, IExercise } from "./exercise.model"

export interface IRoutine {
  name: string;
  username: string;
  createdAt: Date;
  isEditing: boolean;
  exercises: IExercise[];
}

const RoutineSchema = new Schema<IRoutine>({
  name: { type: String },
  username: String,
  createdAt: Date,
  isEditing: Boolean,
  exercises: [ExerciseSchema]
});

export const Routine = model(
  "Routine", RoutineSchema
);



