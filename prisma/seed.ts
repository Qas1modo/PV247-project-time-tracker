import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.category.deleteMany();
  const freeTime = await prisma.category.create({
    data: {
      name: "Free time",
    },
  });
  const work = await prisma.category.create({
    data: {
      name: "Work",
    },
  });
  const school = await prisma.category.create({
    data: {
      name: "School",
    },
  });
  const sport = await prisma.category.create({
    data: {
      name: "Sport",
    },
  });
  const hobbies = await prisma.category.create({
    data: {
      name: "Hobbies",
    },
  });
  const self = await prisma.category.create({
    data: {
      name: "Self-realization",
    },
  });
  const traveling = await prisma.category.create({
    data: {
      name: "Traveling",
    },
  });
  const houseWork = await prisma.category.create({
    data: {
      name: "House work",
    },
  });
  const responsibilities = await prisma.category.create({
    data: {
      name: "Repsonsibilities",
    },
  });
  const sleep = await prisma.category.create({
    data: {
      name: "Sleep",
    },
  });
  console.log({
    freeTime,
    work,
    school,
    sport,
    hobbies,
    self,
    traveling,
    houseWork,
    responsibilities,
    sleep,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
