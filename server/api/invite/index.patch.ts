import { FamilyModel } from "~~/models/family.db";
import protectRoute from "~/server/protectedRoute";
import { serverSupabaseUser } from "#supabase/server";
import { z } from "zod";

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const user = await serverSupabaseUser(e);
  const body = await readBody(e);
  const schema = z
    .object({
      id: z.string().min(5).max(30),
      userId: z.string().min(5).max(50),
    })
    .strict();

  try {
    const { id, userId } = body;

    if (schema.safeParse({ id, userId }).error)
      throw Error("Wrong format of data");

    await FamilyModel.updateOne(
      { _id: id },
      {
        $pull: { invites: user?.email },
        $push: { members: userId },
      }
    );
    return true;
  } catch (error) {
    return error;
  }
});
