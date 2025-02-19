import { FamilyModel } from "~~/models/family.db";
import protectRoute from "~/server/protectedRoute";

export default defineEventHandler(async (e) => {
  await protectRoute(e);

  try {
    const id = e.context.params?.id;
    if (!id) throw Error("Missing id");
    await FamilyModel.deleteOne({ _id: id }).exec();
    return true;
  } catch (error) {
    return false;
  }
});
