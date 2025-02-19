import { FamilyModel } from "~~/models/family.db";
import protectRoute from "~/server/protectedRoute";
import { z } from "zod";
import mongoUser from "~/server/dbUser";

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const dbUser = await mongoUser(e);
  const body = await readBody(e);
  const schema = z
    .object({
      id: z.string().min(5).max(30),
    })
    .strict();

  try {
    const { id } = body;

    if (schema.safeParse({ id }).error) throw Error("Wrong format of data");

    await FamilyModel.updateOne(
      { _id: id },
      {
        $pull: { members: dbUser._id },
      }
    );
    return true;
  } catch (error) {
    return false;
  }
});
