import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import request from "supertest";
import app from "../index";
import { prisma } from "../src/lib/prisma";

describe("Account API Integration Tests", () => {
  const testUser = {
    email: "test@example.com",
    username: "testuser",
    password: "password123",
  };

  beforeAll(async () => {
    // Clean up test user if it exists
    await prisma.account.deleteMany({
      where: {
        OR: [{ email: testUser.email }, { username: testUser.username }],
      },
    });
  });

  afterAll(async () => {
    await prisma.account.deleteMany({
      where: {
        OR: [{ email: testUser.email }, { username: testUser.username }],
      },
    });
    await prisma.$disconnect();
  });

  describe("POST /account/register", () => {
    it("should register a new user successfully", async () => {
      const response = await request(app)
        .post("/account/register")
        .send(testUser);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.token).toBeDefined();
    });

    it("should return 409 if email already exists", async () => {
      const response = await request(app)
        .post("/account/register")
        .send(testUser);

      expect(response.status).toBe(409);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Email already in use.");
    });

    it("should return 400 for invalid email format", async () => {
      const response = await request(app)
        .post("/account/register")
        .send({ ...testUser, email: "invalid-email" });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe("error");
      expect(response.body.errors).toBeDefined();
    });
  });

  describe("POST /account/login", () => {
    it("should login successfully with correct credentials", async () => {
      const response = await request(app)
        .post("/account/login")
        .send({
          username: testUser.username,
          password: testUser.password,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.token).toBeDefined();
    });

    it("should return 401 for incorrect password", async () => {
      const response = await request(app)
        .post("/account/login")
        .send({
          username: testUser.username,
          password: "wrongpassword",
        });

      expect(response.status).toBe(401);
      expect(response.body.status).toBe("error");
    });
  });
});
