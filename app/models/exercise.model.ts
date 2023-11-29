import { Schema, model } from "mongoose";
import { SetSchema, ISet } from "./set.model"
export interface IExercise {
  name: string;
  muscleGroups: string[];
  sets: ISet[];
}

export const ExerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  muscleGroups: { type: [String]},
  sets: [SetSchema]
});

export const Exercise = model(
  "Exercise", ExerciseSchema
);



