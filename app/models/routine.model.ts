import { Schema, model } from "mongoose";
import { ExerciseSchema, IExercise } from "./exercise.model"

export interface IRoutine {
  _id: string;
  name: string;
  username: string;
  createdAt: Date;
  isEditing: boolean;
  exercises: IExercise[];
  muscleGroups: Set<string>;
}

const RoutineSchema = new Schema<IRoutine>({
  _id: Schema.Types.ObjectId,
  name: { type: String, required:true },
  username: String,
  createdAt: Date,
  isEditing: Boolean,
  exercises: [ExerciseSchema],
  muscleGroups: Set<String>,
});

export const Routine = model(
  "Routine", RoutineSchema
);



