import {
  PrismaClient,
  ProgrammingLanguage,
  Snippet,
  User,
  Tag,
  SnippetHasTag,
} from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

function hashPassword(password: string) {
  const hash = hashSync(password, 10);
  return hash;
}

function getRandomElement<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

async function main() {
  const createdUsers: User[] = [];
  const createdLanguages: ProgrammingLanguage[] = [];
  const createdSnippets: Snippet[] = [];

  const tagsToCreate: Omit<Tag, 'id'>[] = [
    { name: 'good practice' },
    { name: 'funny' },
    { name: 'beginner-friendly' },
    { name: 'advanced' },
    { name: 'optimization' },
    { name: 'error handling' },
    { name: 'security' },
    { name: 'performance' },
    { name: 'testing' },
    { name: 'debugging' },
    { name: 'framework' },
    { name: 'library' },
    { name: 'database' },
    { name: 'API' },
    { name: 'frontend' },
    { name: 'backend' },
    { name: 'mobile' },
    { name: 'web' },
    { name: 'UI/UX' },
    { name: 'responsive' },
    { name: 'animation' },
    { name: 'design pattern' },
    { name: 'documentation' },
    { name: 'version control' },
    // Add more tags as needed
  ];

  const usersToCreate: Omit<User, 'id' | 'profileImgUrl'>[] = [
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

  const languagesToCreate: Omit<ProgrammingLanguage, 'id'>[] = [
    {
      name: 'HTML',
    },
    {
      name: 'CSS',
    },
    {
      name: 'Python',
    },
    {
      name: 'JavaScript',
    },
    {
      name: 'PHP',
    },
  ];

  const codeExamples = {
    HTML: [
      `
  <!DOCTYPE html>
  <html>
  <head>
      <title>My Web Page</title>
  </head>
  <body>
      <h1>Hello, World!</h1>
  </body>
  </html>
  `,
      `
  <!DOCTYPE html>
  <html>
  <head>
      <title>My Web Page</title>
  </head>
  <body>
      <h2>Welcome to my website!</h2>
  </body>
  </html>
  `,
    ],
    CSS: [
      `
  body {
    background-color: lightblue;
  }
  
  h1 {
    color: navy;
  }
  `,
      `
  body {
    background-color: #f2f2f2;
  }
  
  h1 {
    color: #333;
  }
  `,
    ],
    Python: [
      `
  def factorial(n):
      if n == 0:
          return 1
      else:
          return n * factorial(n-1)
  `,
      `
  def fibonacci(n):
      if n <= 0:
          return "Invalid input"
      elif n == 1:
          return 0
      elif n == 2:
          return 1
      else:
          return fibonacci(n-1) + fibonacci(n-2)
  `,
    ],
    JavaScript: [
      `
  const add = (a, b) => {
      return a + b;
  };
  
  console.log(add(2, 3)); // Output: 5
  `,
      `
  const greet = (name) => {
      console.log("Hello, " + name + "!");
  };
  
  greet("Alice"); // Output: Hello, Alice!
  `,
    ],
    PHP: [
      `
  <?php
  $fruit = "Apple";
  echo "I love $fruit";
  ?>
  `,
      `
  <?php
  $name = "Bob";
  echo "Hello, " . $name . "!";
  ?>
  `,
    ],
  };

  for (const userData of usersToCreate) {
    const createdUser = await prisma.user.create({
      data: userData,
    });

    createdUsers.push(createdUser);
  }

  for (const languageData of languagesToCreate) {
    const createdLanguage = await prisma.programmingLanguage.create({
      data: languageData,
    });

    createdLanguages.push(createdLanguage);
  }

  for (const tagData of tagsToCreate) {
    await prisma.tag.create({
      data: tagData,
    });
  }

  for (const user of createdUsers) {
    for (let i = 0; i < 5; i++) {
      const snippetLangIndex = Math.floor(Math.random() * 5);
      const snippetLang = languagesToCreate[snippetLangIndex].name;
      const codeExample = getRandomElement(codeExamples[snippetLang]);

      const createdSnippet = await prisma.snippet.create({
        data: {
          userId: user.id,
          programmingLanguageId: snippetLangIndex + 1,
          title: `Snippet ${i + 1}`,
          content: codeExample as string,
          SnippetHasTag: {
            create: tagsToCreate
              .filter(() => Math.random() < 0.5) // Assign random tags
              .map((tag) => ({ tag: { connect: { name: tag.name } } })),
          },
        },
      });

      createdSnippets.push(createdSnippet);
    }
  }

  console.log({ createdUsers, createdLanguages, createdSnippets });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
