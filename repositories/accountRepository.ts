import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../src/lib/prisma";
import { env } from "../src/config/env";
import { AuthenticationError, ConflictError } from "../src/lib/errors";

export default class AccountRepository {
  async login(username: string, password: string): Promise<string> {
    const user = await prisma.account.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    if (!user) {
      throw new AuthenticationError("Invalid username or password.");
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new AuthenticationError("Invalid username or password.");
    }

    const token = sign(
      { id: user.id, username: user.username },
      env.JWT_SECRET,
      {
        algorithm: "HS384",
        expiresIn: "1d",
      }
    );
    return token;
  }

  async register(
    email: string,
    username: string,
    password: string
  ): Promise<string> {
    const existingUser = await prisma.account.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) throw new ConflictError("Email already in use.");
      if (existingUser.username === username) throw new ConflictError("Username already taken.");
    }

    const hashedPass = await hash(password, 12);
    const user = await prisma.account.create({
      data: {
        email,
        username,
        password: hashedPass,
      },
      select: {
        id: true,
        username: true,
      },
    });

    const token = sign(
      { id: user.id, username: user.username },
      env.JWT_SECRET,
      {
        algorithm: "HS384",
        expiresIn: "1d",
      }
    );
    return token;
  }
}
