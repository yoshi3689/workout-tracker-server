import { Routine, IRoutine } from "../models/routine.model"

export const create = async (routine: IRoutine): Promise<Boolean> => {
  try {
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
