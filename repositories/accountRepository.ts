import { config } from "dotenv";
import { PrismaClient } from "../generated/prisma/client";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

config();

export default class AccountRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    this.prisma.$connect();
    return this;
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.prisma.account.findUnique({
      where: {
        username: username,
      },
      select: {
        username: true,
        password: true,
      },
    });

    if (!user) {
      throw new Error("No user found with that username.");
    }

    if (!(await compare(password, user.password))) {
      throw new Error("Invalid password. Please try again.");
    }

    const token = sign(JSON.stringify(user), "NotSoSecret", {
      algorithm: "HS384",
    });
    return token;
  }

  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<string> {
    const hashedPass = await hash(password, 15);
    const user = await this.prisma.account.create({
      data: {
        email, 
        username,
        password: hashedPass,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      select: {
        username: true,
        password: true,
      },
    });
    let token = sign(JSON.stringify(user), "NotSoSecret", {
      algorithm: "HS384",
      expiresIn: "1d",
    });
    return token;
  }
}
