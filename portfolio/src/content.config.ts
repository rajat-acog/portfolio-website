// import { defineCollection } from 'astro:content';
// import { glob } from 'astro/loaders';
// import { z } from 'astro/zod';

// export const collections = {
//   // ✅ PROFILE DATA (YAML per folder)
//   portfolios: defineCollection({
//     loader: glob({
//       base: './src/content/portfolios',
//       pattern: '**/index.yaml',
//     }),
//     schema: z.object({
//       name: z.string(),
//       position: z.string(),
//       description: z.string(),
//       linkedin: z.string(),
//       github: z.string(),

//       hero: z.object({
//         title: z.string(),
//         tagline: z.string(),
//         image: z.string(),
//         image_alt: z.string(),
//         roles: z.array(
//           z.object({
//             name: z.string(),
//             icon: z.string(),
//           })
//         ),
//       }),

//       blogs: z.array(
//         z.object({
//           title: z.string(),
//           slug: z.string(),
//         })
//       ),

//       summary: z.string().optional(),
//       projects: z
//         .array(
//           z.object({
//             name: z.string(),
//             tech: z.array(z.string()).optional(),
//             frontend: z.string().optional(),
//             backend: z.string().optional(),
//           })
//         )
//         .optional(),
//     }),
//   }),

//   // ✅ BLOG FILES (MD)
//   blogs: defineCollection({
//     loader: glob({
//       base: './src/content/portfolios',
//       pattern: '**/*.md',
//     }),
//     schema: z.object({
//       title: z.string(),
//       author: z.string(), // slug
//     }),
//   }),
// };




// import { defineCollection } from 'astro:content';
// import { glob } from 'astro/loaders';
// import { z } from 'astro/zod';

// export const collections = {
//   // ✅ PROFILE DATA (YAML per folder)
//   portfolios: defineCollection({
//     loader: glob({
//       base: './src/content/portfolios',
//       pattern: '**/index.yaml',
//     }),
//     schema: z.object({
//       name: z.string(),
//       position: z.string(),
//       description: z.string(),
//       linkedin: z.string(),
//       github: z.string(),

//       // 👇 IMPORTANT (needed for linking with projects)
//       slug: z.string().optional(),

//       hero: z.object({
//         title: z.string(),
//         tagline: z.string(),
//         image: z.string(),
//         image_alt: z.string(),
//         roles: z.array(
//           z.object({
//             name: z.string(),
//             icon: z.string(),
//           })
//         ),
//       }),

//       blogs: z.array(
//         z.object({
//           title: z.string(),
//           slug: z.string(),
//         })
//       ),

//       summary: z.string().optional(),

//       projects: z
//         .array(
//           z.object({
//             name: z.string(),
//             tech: z.array(z.string()).optional(),
//             frontend: z.string().optional(),
//             backend: z.string().optional(),
//           })
//         )
//         .optional(),
//     }),
//   }),

//   // ✅ BLOG FILES (MD)
//   blogs: defineCollection({
//     loader: glob({
//       base: './src/content/portfolios',
//       pattern: '**/*.md',
//     }),
//     schema: z.object({
//       title: z.string(),
//       author: z.string(), // slug
//     }),
//   }),

//   // ✅ NEW: PROJECTS (DB-like structure 🚀)
//   projects: defineCollection({
//     loader: glob({
//       base: './src/content',
//       pattern: 'projects.yaml',
//     }),
//     schema: z.array(
//       z.object({
//         name: z.string(),
//         slug: z.string(),
//         description: z.string(),

//         // 👇 VERY IMPORTANT
//         people: z.array(z.string()), // must match portfolio slug
//       })
//     ),
//   }),
// };


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

export const collections = {
  portfolios,
  projects,
};