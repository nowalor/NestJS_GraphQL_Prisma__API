import { PrismaClient, User } from '@prisma/client';
import { hashSync } from 'bcrypt';
const prisma = new PrismaClient();

function hashPassword(password: string) {
  const hash = hashSync(password, 10);

  console.log({ hash });

  return hash;
}

async function main() {
  await prisma.user.deleteMany();

  const usersToCreate: Omit<User, 'id'>[] = [
    {
      email: 'alice@prisma.io',
      password: hashPassword('password1'),
      username: 'alice',
      name: 'Alice',
      verificationToken: 'token1',
    },
    {
      email: 'bob@prisma.io',
      password: hashPassword('password2'),
      username: 'bob',
      name: 'Bob',
      verificationToken: 'token2',
    },
    {
      email: 'charlie@prisma.io',
      password: hashPassword('password3'),
      username: 'charlie',
      name: 'Charlie',
      verificationToken: 'token3',
    },
    {
      email: 'dave@prisma.io',
      password: hashPassword('password4'),
      username: 'dave',
      name: 'Dave',
      verificationToken: 'token4',
    },
    {
      email: 'eve@prisma.io',
      password: hashPassword('password5'),
      username: 'eve',
      name: 'Eve',
      verificationToken: 'token5',
    },
  ];

  const createdUsers: User[] = [];

  for (const userData of usersToCreate) {
    const createdUser = await prisma.user.create({
      data: userData,
    });
    createdUsers.push(createdUser);
  }

  console.log({ createdUsers });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
