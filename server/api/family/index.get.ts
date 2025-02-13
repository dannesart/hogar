import { FamilyModel } from "~~/models/family.db";
import protectRoute from "~/server/protectedRoute";
import mongoUser from "~/server/dbUser";

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  try {
    const dbUser = await mongoUser(e);
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
  } catch (error) {
    return error;
  }
});
