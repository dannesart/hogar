import { FamilyModel } from "~~/models/family.db";
import protectRoute from "~/server/protectedRoute";
import { serverSupabaseUser } from "#supabase/server";
import { z } from "zod";
import { UserModel } from "~/models/user.db";

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const authUser = await serverSupabaseUser(e);
  if (!authUser) return "Missing auth";
  const dbUser = await UserModel.findOne({
    _id: authUser?.id,
  });
  if (!dbUser) return "Missing profile";
  const body = await readBody(e);
  const schema = z
    .object({
      id: z.string().min(5).max(30),
      userId: z.string().min(5).max(50),
    })
    .strict();

  try {
    const { id } = body;

    if (schema.safeParse({ id, userId: dbUser._id }).error)
      throw Error("Wrong format of data");

    await FamilyModel.updateOne(
      { _id: id },
      {
        $pull: { invites: authUser?.email },
        $push: { members: dbUser._id },
      }
    );
    return true;
  } catch (error) {
    return error;
  }
});
