import { UserModel } from "~~/models/user.db";
import protectRoute from "~/server/protectedRoute";
import { serverSupabaseUser } from "#supabase/server";
import { z } from "zod";

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const user = await serverSupabaseUser(e);
  if (!user) return;

  const body = await readBody(e);
  const schema = z
    .object({
      displayName: z.string().min(3).max(50),
    })
    .strict();

  try {
    const { displayName } = body;
    const { id } = user;

    if (schema.safeParse({ displayName }).error)
      throw Error("Wrong format of data");

    await UserModel.updateOne(
      { providerId: id },
      {
        $set: { displayName },
      },
      { upsert: true }
    );
    return true;
  } catch (error) {
    return error;
  }
});
