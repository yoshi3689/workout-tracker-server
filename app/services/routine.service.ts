import { Routine, IRoutine } from "../models/routine.model"

export const create = async (routine: IRoutine): Promise<Boolean> => {
  try {
    console.log("logging object from request: " + routine)
    const res = await Routine.create({
      ...routine, _id: null
    });
    
    return res != null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const update = async (routine: IRoutine): Promise<Boolean> => {
  try {
    const res = await Routine.updateOne(
      { _id: routine._id },
      {
        name: routine.name,
        isEditing: routine.isEditing, 
        exercises: routine.exercises,
        muscleGroups: routine.muscleGroups,
        
    });
    return res != null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const getAll = async (username: string): Promise<IRoutine[]> => {
  try {
    const res = await Routine.find({
      username,
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const getExercisesByPR = async (username: string): Promise<IRoutine[]> => {
  // Assuming your model is named 'Routine' and the document is stored in a variable named 'routineModel'
  try {
    // Assuming your model is named 'Routine' and the document is stored in a variable named 'routineModel'
// Also, assuming 'username' is the field you want to filter on

const result = await Routine.aggregate([
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
      _id: "$exercises.name",
      maxWeight: { $first: "$exercises.maxWeight" },
      exercise: { $first: "$exercises" } // Keep the entire exercise object for later projection
    }
  },
  {
    $group: {
      _id: null,
      exercises: {
        $push: {
          exerciseName: "$_id",
          maxWeight: "$maxWeight",
          exercise: "$exercise"
        }
      }
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
      sets: "$sets"
    }
  }
]);


    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}