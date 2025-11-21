import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  numbers: defineTable({
    value: v.number(),
  }),

   users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
  }).index("by_clerk_id", ["clerkId"]),

  posts: defineTable({
    title: v.string(),
    content: v.string(),
    excerpt: v.string(),
    imageId: v.optional(v.id("_storage")),
    authorId: v.id("users"),
    published: v.boolean(),
    createdAt: v.number(),
  }).index("by_published", ["published"]),

  
});
