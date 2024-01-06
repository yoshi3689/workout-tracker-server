import { Schema, model } from "mongoose";
import { SetSchema, ISet } from "./set.model"


export interface IExercise {
  name: string;
  muscleGroups: string[];
  sets: ISet[];
  maxWeight: number;
}

export interface IPersonalRecord extends IExercise {
  createdAt: string;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface IExerciseRecord extends Omit<IExercise, 'name'> {
}

export interface IExerciseLiftableWeight {
  exerciseName: string;
  liftableWeights: number[];
  dates: string[];
  count: number;
}



export const ExerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  muscleGroups: { type: [String]},
  sets: [SetSchema],
  maxWeight: Number
});

export const Exercise = model(
  "Exercise", ExerciseSchema
);



