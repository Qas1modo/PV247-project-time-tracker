import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    await prisma.category.deleteMany();
    const freeTime = await prisma.category.create({
        data: {
            name: "Volný čas"
        },
    });
    const work = await prisma.category.create({
        data: {
            name: "Práce"
        },
    });
    const school = await prisma.category.create({
        data: {
            name: "Škola"
        },
    });
    const sport = await prisma.category.create({
        data: {
            name: "Sport"
        },
    });
    const hobbies = await prisma.category.create({
        data: {
            name: "Koníčky"
        },
    });
    const self = await prisma.category.create({
        data: {
            name: "Seberealizace"
        },
    });
    const traveling = await prisma.category.create({
        data: {
            name: "Cestování"
        },
    });
    const houseWork = await prisma.category.create({
        data: {
            name: "Domácí práce"
        },
    });
    const responsibilities = await prisma.category.create({
        data: {
            name: "Povinosti"
        },
    });
    const sleep = await prisma.category.create({
        data: {
            name: "Spánek"
        },
    });
  console.log({ freeTime, work, school, sport, hobbies, self, traveling, houseWork, 
     responsibilities, sleep})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })