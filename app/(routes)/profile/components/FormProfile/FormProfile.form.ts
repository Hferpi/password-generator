
import z from "zod";


export const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(5).max(60),
  profileImage: z.string(),
  username: z.string().min(2).max(50),
  id: z.string(),
});