import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import seoPlugin from "@payloadcms/plugin-seo";

import {
  Users,
  Boilerplate,
  Categories,
  Posts,
  Projects,
  Tags,
  Media,
} from "./collections";
import { Library } from "./collections/Library";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  cors: "*",
  editor: slateEditor({}),
  collections: [
    Users,
    Boilerplate,
    Categories,
    Library,
    Posts,
    Projects,
    Tags,
    Media,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    payloadCloud(),
    seoPlugin({
      collections: ["library", "posts", "projects"],
      uploadsCollection: "media",
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
