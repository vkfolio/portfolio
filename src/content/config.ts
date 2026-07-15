import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    date: z.union([z.string(), z.date()]).transform((v) => v instanceof Date ? v.toISOString().slice(0, 10) : v),
    dateLabel: z.string(),
    room: z.string(),
    roomLabel: z.string().optional(),
    words: z.number(),
  }),
});

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    desc: z.string(),
    group: z.enum(['oss', 'personal']),
    groupLabel: z.string(),
    accent: z.string(),
    accentSoft: z.string(),
    accentInk: z.string(),
    year: z.string(),
    role: z.string(),
    fieldNote: z.string().optional(),
    links: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      })
    ).optional(),
  }),
});

export const collections = { notes, projects };
