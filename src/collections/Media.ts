import { CollectionConfig } from "payload/types";
const Media: CollectionConfig = {
  slug: "media",
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: undefined,
        position: "center",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
};
export default Media;
