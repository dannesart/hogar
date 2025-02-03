import type { Family } from "~~/models/family";
import { FamilySchema } from "~~/models/family";
import { FamilyModel } from "~~/models/family.db";
import { serverSupabaseUser } from "#supabase/server";
import protectRoute from "~/server/protectedRoute";

const newFamily = (title: string, createdBy: string) => {
  const family: Family = {
    title,
    createdBy,
    created: new Date(),
    updatedBy: createdBy,
    updated: new Date(),
    invites: [],
    members: [createdBy],
  };
  return family;
};

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const user = await serverSupabaseUser(e);

  const body = await readBody(e);

  const newFamilyObject = newFamily(body.title, user?.id || "Missing token");
  const valid = await FamilySchema.safeParse(newFamilyObject);
  if (valid.success) {
    try {
      const familyDoc = new FamilyModel(newFamilyObject);
      await familyDoc.save();
      return familyDoc.toJSON();
    } catch (error) {
      return error;
    }
  } else {
    return valid.error; // or handle the validation error accordingly
  }
});
