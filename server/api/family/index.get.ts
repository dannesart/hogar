import { FamilyModel } from "~~/models/family.db";
import protectRoute from "~/server/protectedRoute";
import { serverSupabaseUser } from "#supabase/server";
import { UserModel } from "~/models/user.db";

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const authUser = await serverSupabaseUser(e);
  if (!authUser) return "Missing token";
  const dbUser = await UserModel.findOne({ providerId: authUser.id });
  if (!dbUser) return "Missing user";
  const families = await FamilyModel.find({
    members: dbUser._id,
  }).populate("members");

  return (
    [...families].map((family) => {
      return {
        ...family.toJSON(),
        id: family._id,
      };
    }) || []
  );
});
