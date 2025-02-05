import { FamilyModel } from "~~/models/family.db";
import protectRoute from "~/server/protectedRoute";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const user = await serverSupabaseUser(e);
  const families = await FamilyModel.find({
    createdBy: user?.id,
  });

  return (
    [...families].map((family) => {
      return {
        ...family.toJSON(),
        id: family._id,
      };
    }) || []
  );
});
