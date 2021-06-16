const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed");
const app = require("../app");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/topics", () => {
  describe("GET", () => {
    test("status code: 200, array of topic objects that has properties slug,description and is of length 3", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics.length).toBe(3);
          topics.forEach((topic) => {
            expect(topic.hasOwnProperty("slug")).toBe(true);
            expect(topic).toHaveProperty("description");
          });
        });
    });
    test("status code: 200, each element of array of topics object is made up of same keys(slug, description)", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
  });
});

describe.only("/api/articles/:article_id", () => {
  test("status: 200, responds with a single article object matching given id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          body: "I find this existence challenging",
          votes: 100,
          author: "butter_bridge",
          created_at: expect.any(String),
        });
      });
  });
});
