import { Schema, model } from "mongoose";
import { ExerciseSchema, IExercise } from "./exercise.model"

export interface IRoutine {
  _id: string;
  name: string;
  username: string;
  createdAt: Date;
  isEditing: boolean;
  exercises: IExercise[];
  muscleGroups: string[];
}

const RoutineSchema = new Schema<IRoutine>({
  _id: Schema.Types.ObjectId,
  name: String,
  username: String,
  createdAt: Date,
  isEditing: Boolean,
  exercises: [ExerciseSchema],
  muscleGroups: [String]
});

export const Routine = model(
  "Routine", RoutineSchema
);



