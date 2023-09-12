import * as z from "zod";

export const CommentValidation = z.object({
  text: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});

export type CommentValidationType = z.infer<typeof CommentValidation>;
