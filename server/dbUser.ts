import protectRoute from "~/server/protectedRoute";
import { serverSupabaseUser } from "#supabase/server";
import { UserModel } from "~/models/user.db";

export default async (e: any) => {
  await protectRoute(e);
  const authUser = await serverSupabaseUser(e);
  if (!authUser) throw new Error("Missing auth");
  const dbUser = await UserModel.findOne({
    _id: authUser?.id,
  });
  if (!dbUser) throw new Error("Missing profile");

  return dbUser;
};
