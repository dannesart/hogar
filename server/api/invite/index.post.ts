import { FamilyModel } from "~~/models/family.db";
import protectRoute from "~/server/protectedRoute";
import { z } from "zod";

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const body = await readBody(e);
  const schema = z
    .object({
      email: z.string().email().min(5),
      id: z.string().min(5).max(30),
    })
    .strict();

  try {
    const { id, email } = body;

    if (schema.safeParse({ id, email }).error)
      throw Error("Wrong format of data");

    await FamilyModel.updateOne(
      { _id: id },
      {
        $push: { invites: email },
      }
    );
    return true;
  } catch (error) {
    return error;
  }
});
