import type { Family } from "~~/models/family";
import { FamilySchema } from "~~/models/family";
import { FamilyModel } from "~~/models/family.db";
import protectRoute from "~/server/protectedRoute";
import mongoUser from "~/server/dbUser";
import { serverSupabaseUser } from "#supabase/server";
import { UserModel } from "~/models/user.db";

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
  try {
    const dbUser = await mongoUser(e);
    const body = await readBody(e);

    const newFamilyObject = newFamily(
      body.title,
      dbUser._id.toString() || "Missing token"
    );
    const valid = await FamilySchema.safeParse(newFamilyObject);
    if (valid.success) {
      const familyDoc = new FamilyModel(newFamilyObject);
      await familyDoc.save();
      return familyDoc.toJSON();
    } else {
      return valid.error; // or handle the validation error accordingly
    }
  } catch (error) {
    return error;
  }
});
