import { Routine } from "../models/routine.model"
import { IExerciseRecordMongoaggregate, IPersonalRecord,  } from "../models/exercise.model";

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

export const getExercisesOrderedByDate = async (username: string): Promise<IExerciseRecordMongoaggregate[]> => {
  try {
    const result: IExerciseRecordMongoaggregate[] = await Routine.aggregate([
      {
        $match: {
          username
        }
      },
      {
        $unwind: "$exercises" // Deconstruct the exercises array within each routine
      },
      {
        $group: {
          _id: "$exercises.name", // Group by exercise name
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
          exerciseName: "$_id", // Rename _id to exerciseName
          exercises: {
            $slice: [
              {
                $map: {
                  input: "$exercises", // Map over the exercises array
                  as: "exercise",
                  in: {
                    maxWeight: "$$exercise.maxWeight",
                    sets: "$$exercise.sets",
                    routineDate: "$$exercise.routineDate"
                  }
                }
              },
              { $size: "$exercises" } // Ensure the resulting array has the same length as the original exercises array
            ]
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