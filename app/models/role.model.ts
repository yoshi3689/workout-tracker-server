import { Schema, model } from "mongoose";

interface IRole {
  name: string;
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true },
});

export const Role = model(
  "Role", roleSchema
);

// create the three roles in the table
export const initial = async() => {
  if (await Role.estimatedDocumentCount() === 0) {
    new Role({
      name: "user",
    })
      .save()
      .then((res) => console.debug(res));

    new Role({
      name: "moderator",
    })
      .save()
      .then((res) => console.debug(res));

    new Role({
      name: "admin",
    })
      .save()
      .then((res) => console.debug(res));
  }
}


