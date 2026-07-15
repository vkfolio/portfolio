// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: null,
  token: null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "notes",
        label: "Notes",
        path: "src/content/notes",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "dek",
            label: "Dek",
            required: true
          },
          {
            type: "string",
            name: "date",
            label: "Date (YYYY-MM-DD)",
            required: true
          },
          {
            type: "string",
            name: "dateLabel",
            label: "Date Label",
            required: true
          },
          {
            type: "string",
            name: "room",
            label: "Room Slug",
            required: true
          },
          {
            type: "string",
            name: "roomLabel",
            label: "Room Label",
            required: true
          },
          {
            type: "number",
            name: "words",
            label: "Word Count",
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "projects",
        label: "Projects",
        path: "src/content/projects",
        format: "json",
        fields: [
          {
            type: "string",
            name: "slug",
            label: "Slug",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "desc",
            label: "Description",
            required: true
          },
          {
            type: "string",
            name: "group",
            label: "Group",
            options: ["oss", "personal"],
            required: true
          },
          {
            type: "string",
            name: "groupLabel",
            label: "Group Label",
            required: true
          },
          {
            type: "string",
            name: "accent",
            label: "Accent Color",
            required: true
          },
          {
            type: "string",
            name: "accentSoft",
            label: "Accent Soft",
            required: true
          },
          {
            type: "string",
            name: "accentInk",
            label: "Accent Ink",
            required: true
          },
          {
            type: "string",
            name: "year",
            label: "Year",
            required: true
          },
          {
            type: "string",
            name: "role",
            label: "Role",
            required: true
          },
          {
            type: "string",
            name: "fieldNote",
            label: "Field Note Slug"
          },
          {
            type: "object",
            name: "links",
            label: "Links",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label"
              },
              {
                type: "string",
                name: "href",
                label: "URL"
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
