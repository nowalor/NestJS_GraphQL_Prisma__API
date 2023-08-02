/*
  Warnings:

  - Added the required column `content` to the `snippets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_snippets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "programmingLanguageId" INTEGER NOT NULL,
    CONSTRAINT "snippets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "snippets_programmingLanguageId_fkey" FOREIGN KEY ("programmingLanguageId") REFERENCES "programming_languages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_snippets" ("id", "programmingLanguageId", "userId") SELECT "id", "programmingLanguageId", "userId" FROM "snippets";
DROP TABLE "snippets";
ALTER TABLE "new_snippets" RENAME TO "snippets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
