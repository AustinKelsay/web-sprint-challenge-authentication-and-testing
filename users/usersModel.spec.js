const request = require("supertest");
const db = require("../database/dbConfig");
const server = require("../api/server");

describe("usersModel", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  const user = {
    id: 1,
    username: "austin",
    password: "austin",
  };
  // makes sure it is a string - sanity test with Number
  describe("register", () => {
    it("user is not empty", () => {
      expect(user).toMatchObject({
        username: expect.any(String),
      });
    });
    it("user is not null", () => {
      expect(user).not.toBeNull();
    });
    // add the user to the databse
    it("should add a user into the database", async () => {
      await request(server).post("/api/auth/register").send({
        username: "austin",
        password: "austin",
      });
      const users = await db("users");
      // checks that one user has been entered
      expect(users).toHaveLength(1);
    });

    it("should add this specific user into the database", async () => {
      await request(server).post("/api/auth/register").send({
        username: "austin",
        password: "austin",
      });
      const users = await db("users");
      // checks that one user has been entered
      expect(users[0].username).toEqual(user.username);
    });

  });
  // makes sure it is a string - sanity test with number.
  describe("login", () => {
    it("not empty", () => {
      expect(user).toMatchObject({
        username: expect.any(String),
      });
    });
    it("not null", () => {
      expect(user).not.toBeNull();
    });
  });
  describe("login", () => {
    it("not empty", () => {
      expect(user).toMatchObject({
        password: expect.any(String),
      });
    });
    it("not null", () => {
      expect(user).not.toBeNull();
    });
  });
  describe("login", () => {
    const user = {
      username: "austin",
      password: "austin",
    };
    // checks to see if the user property exists
    it("does the word username exist", () => {
      expect(user).toHaveProperty("username");
    });
    it("not null", () => {
      expect(user).not.toBeNull();
    });
    // checks to see if property of password exists
    it("does the word password exist", () => {
      expect(user).toHaveProperty("password");
    });
  });
});