-- CreateTable
CREATE TABLE "About" (
    "Nick" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "About1" TEXT NOT NULL,
    "About2" TEXT NOT NULL,
    "ProfilePhoto" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("Nick")
);

-- CreateTable
CREATE TABLE "Projects" (
    "Name" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "Deploy" TEXT NOT NULL,
    "GitHub" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("Name")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "Plataform" TEXT NOT NULL,
    "Direction" TEXT NOT NULL,
    "TypePhone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("Plataform")
);

-- CreateTable
CREATE TABLE "Skills" (
    "Name" TEXT NOT NULL,
    "Icon" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("Name")
);
