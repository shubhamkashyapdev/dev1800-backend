import { CollectionConfig } from "payload/types";
import {
  BlockQuote,
  CodeBlock,
  FeaturesListBlock,
  ImageBlock,
  ImageGridBlock,
  ParragraphBlock,
  PrimaryHeadingBlock,
  SecondaryHeadingBlock,
} from "../blocks";
import {
  TitleField,
  SlugField,
  ReadTimeField,
  ViewsField,
  TagsField,
} from "../fields";
import { formattedSlug } from "../utils/utils";

const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    defaultColumns: ["title", "author", "category", "tags", "status"],
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    TitleField,
    SlugField,
    ReadTimeField,
    ViewsField,
    TagsField,
    {
      name: "publishedDate",
      type: "date",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "postCategory",
      type: "relationship",
      relationTo: "category",
    },
    {
      name: "excerpt",
      type: "textarea",
      maxLength: 180,
      required: true,
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          value: "draft",
          label: "Draft",
        },
        {
          value: "published",
          label: "Published",
        },
      ],
      defaultValue: "draft",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "blocks",
      type: "blocks",
      blocks: [
        PrimaryHeadingBlock,
        SecondaryHeadingBlock,
        ParragraphBlock,
        BlockQuote,
        CodeBlock,
        FeaturesListBlock,
        ImageGridBlock,
        ImageBlock,
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        const title = data.title;
        data.slug = formattedSlug(title);
        return data;
      },
    ],
    beforeOperation: [
      async ({ operation, args, req }) => {
        const slug = args?.req?.body?.variables?.slug;
        if (operation === "read" && slug) {
          // update the view count
          const posts = await req.payload.find({
            collection: "posts",
            where: {
              slug: {
                equals: slug,
              },
            },
          });
          const post = posts.docs[0];
          if (post) {
            await req.payload.update({
              collection: "posts",
              id: post.id,
              data: {
                views: (Number(post.views) || 0) + 1,
              },
            });
          }
        }
      },
    ],
  },
};

export default Posts;
