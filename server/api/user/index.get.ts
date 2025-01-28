import { serverSupabaseUser } from "#supabase/server";
import protectRoute from "~/server/protectedRoute";

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const user = await serverSupabaseUser(event);

  return user;
});
