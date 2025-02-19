import { FamilyModel } from "~~/models/family.db";
import protectRoute from "~/server/protectedRoute";

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  try {
    const id = e.context.params?.id;
    if (!id) throw Error("Missing id");
    const family = await FamilyModel.findOne({
      _id: id,
    }).populate("members");
    if (!family) return false;
    return { ...family.toJSON(), id: family._id };
  } catch (error) {
    return error;
  }
});
