import * as z from "zod";

export const JobApplicationValidation = z.object({
  company: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  position: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  location: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  status: z.enum(["PENDING", "INTERVIEW", "DECLINED"]),
  type: z.enum(["FULL_TIME", "PART_TIME", "INTERNSHIP", "REMOTE"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  description: z
    .string()
    .nonempty()
    .min(3, { message: "Minimum 10 characters." }),
});

export type JobApplicationValidationType = z.infer<
  typeof JobApplicationValidation
>;
