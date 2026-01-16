import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Portfolio CMS',
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      slug: 'profile',
      admin: {
        useAsTitle: 'name',
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'bio',
          type: 'richText',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          required: true,
        },
        {
          name: 'resumeURL',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'GitHub', value: 'github' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'Email', value: 'email' },
              ],
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'seoTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'seoDescription',
          type: 'textarea',
          required: true,
        },
        {
          name: 'seoKeywords',
          type: 'array',
          fields: [
            {
              name: 'keyword',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      slug: 'experience',
      admin: {
        useAsTitle: 'company',
        defaultColumns: ['company', 'role', 'startDate', 'endDate'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'company',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'startDate',
          type: 'date',
          required: true,
        },
        {
          name: 'endDate',
          type: 'date',
          required: false,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'techStack',
          type: 'array',
          fields: [
            {
              name: 'technology',
              type: 'text',
            },
          ],
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
      defaultSort: 'order',
    },
    {
      slug: 'projects',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'featured', 'order'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'category',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'techStack',
          type: 'array',
          fields: [
            {
              name: 'technology',
              type: 'text',
            },
          ],
          required: true,
        },
        {
          name: 'repoLink',
          type: 'text',
          required: false,
        },
        {
          name: 'liveLink',
          type: 'text',
          required: false,
        },
        {
          name: 'coverImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          hooks: {
            beforeValidate: [
              ({ data }) => {
                if (data?.title && !data?.slug) {
                  return {
                    ...data,
                    slug: data.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, ''),
                  };
                }
                return data;
              },
            ],
          },
        },
      ],
      defaultSort: 'order',
    },
    {
      slug: 'skills',
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'category', 'proficiency', 'order'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'iconName',
          type: 'text',
          required: true,
          admin: {
            description: 'Lucide React icon name (e.g., "Globe", "Database", "Server")',
          },
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Frontend', value: 'frontend' },
            { label: 'Backend', value: 'backend' },
            { label: 'Database', value: 'database' },
            { label: 'DevOps', value: 'devops' },
            { label: 'Tools', value: 'tools' },
          ],
          required: true,
        },
        {
          name: 'proficiency',
          type: 'select',
          options: [
            { label: 'Beginner', value: '1' },
            { label: 'Intermediate', value: '2' },
            { label: 'Advanced', value: '3' },
            { label: 'Expert', value: '4' },
            { label: 'Master', value: '5' },
          ],
          required: false,
          defaultValue: '3',
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
      defaultSort: 'order',
    },
    {
      slug: 'media',
      upload: true,
      admin: {
        useAsTitle: 'alt',
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
          admin: {
            description: 'Alt text for accessibility (required)',
          },
        },
      ],
    },
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  editor: lexicalEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  secret: process.env.PAYLOAD_SECRET || '',
});