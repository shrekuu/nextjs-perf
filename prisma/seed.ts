import { PrismaClient, Prisma } from "@/app/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Insert 100 random users
const usersData: Prisma.UserCreateInput[] = Array.from({ length: 100 }).map(() => ({
  email: faker.internet.email(),
  name: faker.person.fullName(), // Updated from faker.name.fullName() to faker.person.fullName()
  posts: {
    create: [
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        published: faker.datatype.boolean(),
      },
    ],
  },
}));

export async function main() {
  for (const u of usersData) {
    await prisma.user.create({ data: u });
  }

  console.log("Inserted 100 random users");
}

main();
