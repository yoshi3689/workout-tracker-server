import { Routine, IRoutine } from "../models/routine.model"

export const add = async (routine: IRoutine): Promise<Boolean> => {
  try {
    const res = await Routine.create({
      name: routine.name,
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