import { FamilyModel } from "~~/models/family.db";
import protectRoute from "~/server/protectedRoute";
import { z } from "zod";
import mongoUser from "~/server/dbUser";

export default defineEventHandler(async (e) => {
  await protectRoute(e);

  try {
    const dbUser = await mongoUser(e);
    const body = await readBody(e);
    const schema = z
      .object({
        id: z.string().min(5).max(30),
      })
      .strict();
    const { id } = body;

    if (schema.safeParse({ id }).error) throw Error("Wrong format of data");
    if (!dbUser.email) throw new Error("Missing email");
    if (!dbUser._id) throw new Error("Missing userid");
    await FamilyModel.updateOne(
      { _id: id },
      {
        $pull: { invites: dbUser.email },
        $push: { members: dbUser._id },
      }
    ).exec();
    return true;
  } catch (error) {
    return error;
  }
});
