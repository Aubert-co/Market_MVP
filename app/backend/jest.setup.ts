import { prisma } from "./src/lib/prisma"

afterAll(async()=>{
    await prisma.$disconnect()
})
afterEach(()=>{
   
  jest.clearAllMocks();
})