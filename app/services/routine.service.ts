import { Routine, IRoutine } from "../models/routine.model"

export const create = async (routine: IRoutine): Promise<Boolean> => {
  try {
    const res = await Routine.create({
      name: routine.name,
      username: routine.username,
      isEditing: routine.isEditing, 
      createdAt: routine.createdAt,
      exercises: routine.exercises
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