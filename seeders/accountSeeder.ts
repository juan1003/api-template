import { PrismaClient } from "../generated/prisma/client";
import { hash } from "bcrypt";

export default class AccountSeeder {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
    this.prisma.$connect();
  }
  async seed() {
    await this.prisma.account.create({
      data: {
        email: "jdejesus93@gmail.com",
        username: "jdejesus93",
        password: await hash('password', 15),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      select: {
        username: true,
        password: true,
      },
    });
  }
}
