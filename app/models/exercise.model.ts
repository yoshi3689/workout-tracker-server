import { Schema, model } from "mongoose";
import { SetSchema } from "./set.model"
interface IExercise {
  name: string;
  sets: [typeof SetSchema];
}

export const ExerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  sets: { type: [Schema.Types.ObjectId] }
});

export const Exercise = model(
  "Exercise", ExerciseSchema
);



