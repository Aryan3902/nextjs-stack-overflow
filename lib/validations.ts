import { z } from "zod";

export const QuestionsFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(130, { message: "Title can not exceed 130 characters." }),
  explanation: z
    .string()
    .min(10, {
      message: "Explanation must be at least 10 characters.",
    })
    .max(500, { message: "Explanation can not exceed 500 characters." }),
  tags: z.array(z.string().min(1).max(15)).min(1).max(4),
});
