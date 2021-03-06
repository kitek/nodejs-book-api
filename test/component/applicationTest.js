const httpClient = require("supertest");
const assert = require("assert");
const config = require("../../src/config");

function auth(req, res, next) {
  next();
}

describe("Book inventory", function() {
  it("allows to stock up the items", async function() {
    const app = await require("../../src/app")({ config, auth });
    const request = httpClient(app);

    // CREATE
    const createResult = await request
      .post("/book")
      .send({
        title: "JavaScript in Action",
        authors: ["James Smith", "Kate Donovan"],
        isbn: "0123456789",
        description: "The ultimate JS book!"
      })
      .set("Content-Type", "application/json")
      .expect(302);

    // READ
    const readResult = await request
      .get(createResult.header.location)
      .set("Accept", "application/json")
      .expect(200);

    assert.deepEqual(readResult.body, {
      title: "JavaScript in Action",
      slug: "javascript-in-action",
      authors: ["James Smith", "Kate Donovan"],
      isbn: "0123456789",
      description: "The ultimate JS book!"
    });
  });
});
