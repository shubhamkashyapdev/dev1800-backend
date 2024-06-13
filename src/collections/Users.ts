import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
      required: true,
      defaultValue: "user",
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default Users;
