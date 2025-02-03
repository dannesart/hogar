import { z } from "zod";

const FamilySchema = z
  .object({
    title: z.string().min(3).max(50),
    id: z.string().optional(),
    createdBy: z.string(),
    created: z.date(),
    updatedBy: z.string(),
    updated: z.date(),
    members: z.array(z.string()),
    invites: z.array(z.string()),
  })
  .strict();

type Family = z.infer<typeof FamilySchema>;
export type { Family };
export { FamilySchema };
