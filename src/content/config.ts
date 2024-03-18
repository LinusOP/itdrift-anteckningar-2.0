import { defineCollection, z } from "astro:content";

const noteColletion = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    order: z.number().min(0),
  }),
});

export const collections = {
  notes: noteColletion,
};
