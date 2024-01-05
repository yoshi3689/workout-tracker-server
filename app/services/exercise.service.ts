import { Routine, IRoutine } from "../models/routine.model"
import { IExerciseRecord, IPersonalRecord } from "../models/exercise.model";

export const getExercisesSortedByMaxWeight = async (username: string): Promise<IPersonalRecord[]> => {
  try {
    const result: IPersonalRecord[] = await Routine.aggregate([
      {
        $match: {
          username
        }
      },
      {
        $unwind: "$exercises" // Deconstruct the exercises array within each routine
      },
      {
        $sort: {
          "exercises.maxWeight": -1 // Sort exercises by maxWeight in descending order
        }
      },
      {
        $group: {
          _id: {
            exerciseName: "$exercises.name",
            routineDate: "$createdAt" // Assuming createdAt is the date field in the routine
          },
          maxWeight: { $first: "$exercises.maxWeight" },
          exercise: { $first: "$exercises" } // Keep the entire exercise object for later projection
        }
      },
      {
        $group: {
          _id: "$_id.exerciseName",
          routineDate: { $first: "$_id.routineDate" },
          maxWeight: { $max: "$maxWeight" },
          count: { $sum: 1 }, // Count occurrences of the same exercise name
          exercises: {
            $push: {
              maxWeight: "$maxWeight",
              exercise: "$exercise"
            }
          }
        }
      },
      {
        $sort: {
          count: -1 // Sort by the count of the same exercise name in descending order
        }
      },
      {
        $unwind: "$exercises" // Deconstruct the exercises array within the grouped result
      },
      {
        $replaceRoot: { newRoot: "$exercises.exercise" } // Promote the exercise object to the root level
      },
      {
        $project: {
          _id: 0,
          documentId: "$_id",
          exerciseId: "$_id.exerciseId",
          exerciseName: "$name",
          maxWeight: "$maxWeight",
          sets: "$sets",
          routineDate: "$routineDate"
        }
      }
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const getExercisesOrderedByDate = async (username: string): Promise<IExerciseRecord[][]> => {
  try {
    const result: IExerciseRecord[][] = await Routine.aggregate([
      {
        $match: {
          username
        }
      },
      {
        $unwind: "$exercises" // Deconstruct the exercises array within each routine
      },
      {
        $sort: {
          "createdAt": 1 // Sort routines by createdAt in ascending order
        }
      },
      {
        $group: {
          _id: "$exercises.name",
          exercises: {
            $push: {
              maxWeight: "$exercises.maxWeight",
              sets: "$exercises.sets",
              routineDate: "$createdAt" // Assuming createdAt is the date field in the routine
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          ["$_id"]: {
            $map: {
              input: "$exercises",
              as: "exercise",
              in: {
                maxWeight: "$$exercise.maxWeight",
                sets: "$$exercise.sets",
                routineDate: "$$exercise.routineDate"
              }
            }
          }
        }
      }
    ]);
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}