/*
  Warnings:

  - Added the required column `title` to the `snippets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "snippet_has_tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "snippetId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    CONSTRAINT "snippet_has_tag_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "snippets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "snippet_has_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_snippets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "programmingLanguageId" INTEGER NOT NULL,
    CONSTRAINT "snippets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "snippets_programmingLanguageId_fkey" FOREIGN KEY ("programmingLanguageId") REFERENCES "programming_languages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_snippets" ("content", "id", "programmingLanguageId", "userId") SELECT "content", "id", "programmingLanguageId", "userId" FROM "snippets";
DROP TABLE "snippets";
ALTER TABLE "new_snippets" RENAME TO "snippets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");
