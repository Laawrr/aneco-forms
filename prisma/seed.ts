import prisma from '../lib/prisma';

async function main() {
  console.log('Seeding database...');

  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      first_name: 'Admin',
      last_name: 'User',
      username: 'admin',
      password: 'changeme', // replace with hashed password in production
      admin: true,
    },
  });

  const form = await prisma.forms.create({
    data: {
      form_name: 'Customer Satisfaction Survey',
      form_description: 'Sample form for seeding',
      user_id: adminUser.id,
      form_content: {
        create: [
          { form_content_description: 'How satisfied are you with the service?', order: 1, required: true },
          { form_content_description: 'How likely are you to recommend us to a friend?', order: 2, required: true },
        ],
      },
    },
  });

  console.log('Seed finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
