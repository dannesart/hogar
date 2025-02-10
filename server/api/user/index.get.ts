import { serverSupabaseUser } from "#supabase/server";
import { UserModel } from "~/models/user.db";
import protectRoute from "~/server/protectedRoute";

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const authUser = await serverSupabaseUser(event);
  if (!authUser) return {};

  const displayName =
    authUser.user_metadata?.user_name ||
    authUser.user_metadata?.name?.split(" ")[0] ||
    authUser.user_metadata?.full_name?.split(" ")[0];
  const picture = authUser.user_metadata?.picture;

  let user = {
    displayName,
    email: authUser.email,
    picture,
    providerId: authUser.id,
    id: "",
  };

  const dbUser = await UserModel.findOne({
    providerId: authUser.id,
  });
  if (dbUser) {
    if (dbUser._id) {
      user.id = dbUser._id.toString();
    }
    if (dbUser.displayName) {
      user.displayName = dbUser.displayName;
    }
    if (dbUser.picture) {
      user.picture = dbUser.picture;
    }
  }

  return user;
});
