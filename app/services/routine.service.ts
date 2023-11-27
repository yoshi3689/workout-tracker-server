import { Routine, IRoutine } from "../models/routine.model"

export const create = async (routine: IRoutine): Promise<Boolean> => {
  try {
    const res = await Routine.create({
      name: routine.name,
      username: routine.username,
      isEditing: routine.isEditing, 
      createdAt: routine.createdAt,
      exercises: []
    });
    return res != null;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const getAll = async (username: string): Promise<IRoutine[]> => {
  console.log(username)
  try {
    const res = await Routine.find({
      username,
    });
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}