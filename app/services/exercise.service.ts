import { Routine } from "../models/routine.model"
import { IExerciseLiftableWeight, IPersonalRecord,  } from "../models/exercise.model";

export const getExercisesSortedByMaxWeight = async (username: string): Promise<IPersonalRecord[]> => {
  try {
    const result: IPersonalRecord[] = await Routine.aggregate([
      {
        $match: {
          username
        }
      },
      {
        $unwind: "$exercises"
      },
      {
        $sort: {
          "exercises.maxWeight": -1
        }
      },
      {
        $group: {
          _id: "$exercises.name",
          maxWeight: { $first: "$exercises.maxWeight" },
          exercise: { $first: "$exercises" },
          routineDate: { $first: "$createdAt" } // Assuming createdAt is the date field in the routine
        }
      },
      {
        $sort: {
          maxWeight: -1 // Sort by maxWeight in descending order
        }
      },
      {
        $group: {
          _id: "$_id",
          routineDate: { $first: "$routineDate" },
          maxWeight: { $first: "$maxWeight" },
          count: { $sum: 1 },
          exercises: {
            $push: "$exercise"
          }
        }
      },
      {
        $sort: {
          count: -1
        }
      },
      {
        $unwind: "$exercises"
      },
      {
        $replaceRoot: { newRoot: "$exercises" }
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

export const getExercisesOrderedByDate = async (username: string): Promise<IExerciseLiftableWeight[]> => {
  try {
    const result: IExerciseLiftableWeight[] = await Routine.aggregate([
      {
        $match: {
          username
        }
      },
      {
        $unwind: "$exercises"
      },
      {
        $group: {
          _id: "$exercises.name",
          liftableWeights: {
            $push: "$exercises.maxWeight"
          },
          dates: {
            $push: "$createdAt"
          },
          count: {
            $sum: 1  // Count occurrences of the same exercise name
          }
        }
      },
      {
        $sort: {
          count: -1  // Sort by the count of the same exercise name in descending order
        }
      },
      {
        $project: {
          _id: 0,
          exerciseName: "$_id",
          liftableWeights: "$liftableWeights",
          dates: "$dates",
          count: "$count"
        }
      }
    ]);

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}