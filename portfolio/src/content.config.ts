import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolios = defineCollection({
  loader: glob({
    base: './src/content/portfolios',
    pattern: '**/!(*README).md', // ✅ exclude README
  }),

  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.coerce.date().optional(),
    position: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({
    base: './src/content',
    pattern: 'projects.yaml',
  }),
});

const profiles = defineCollection({
  loader: glob({
    base: './src/content',
    pattern: 'profiles.yaml',
  }),
});

export const collections = {
  portfolios,
  projects,
  profiles,
};

