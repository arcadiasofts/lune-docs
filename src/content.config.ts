import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog 컬렉션
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/contents/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    author: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
});

// Notice 컬렉션
const notice = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/contents/notices' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    status: z.string().optional(),
  }),
});

// Docs 컬렉션
const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/contents/docs' }),
  schema: z.object({
    title: z.string(),
    path: z.string(),
    category: z.string().optional(),
    product: z.string().optional(),
    lastUpdate: z.coerce.date().optional(),
    status: z.enum(['verified', 'develop', 'testing', 'deprecated']).optional(),
    order: z.number().optional(), // 문서 정렬 순서
  }),
});

export const collections = { blog, notice, docs };
