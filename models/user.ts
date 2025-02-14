import { z } from "zod";

const UserSchema = z
  .object({
    displayName: z.string().min(3).max(50),
    id: z.string().optional(),
    providerId: z.string(),
    status: z.string(),
    picture: z.string(),
    email: z.string(),
  })
  .strict();

type User = z.infer<typeof UserSchema>;
export type { User };
export { UserSchema };
