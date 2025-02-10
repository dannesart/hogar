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
    })
    .strict();

  try {
    const { id } = body;

    if (schema.safeParse({ id }).error) throw Error("Wrong format of data");

    await FamilyModel.updateOne(
      { _id: id },
      {
        $pull: { members: user?.id },
      }
    );
    return true;
  } catch (error) {
    return false;
  }
});
