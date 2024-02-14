-- CreateTable
CREATE TABLE "About" (
    "Id" TEXT NOT NULL,
    "Nick" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "About1" TEXT NOT NULL,
    "About2" TEXT NOT NULL,
    "ProfilePhoto" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "Deploy" TEXT NOT NULL,
    "GitHub" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "Id" TEXT NOT NULL,
    "Plataform" TEXT NOT NULL,
    "Direction" TEXT NOT NULL,
    "TypePhone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Icon" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("Id")
);
