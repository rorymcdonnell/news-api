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

describe("/api/articles/:article_id", () => {
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
  test("status: 404 not found - article ID does not exist", () => {
    return request(app)
      .get("/api/articles/1000")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("ID does not exist try again bozo!");
      });
  });
  test("status: 400 bad request - invalid ID", () => {
    return request(app)
      .get("/api/articles/finchat")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("invalid ID, sort it out!");
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("PATCH status 200: responds with updated votes tally for a single article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 5 })
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 105,
            topic: "mitch",
            author: "butter_bridge",
            created_at: expect.any(String),
          })
        );
      });
  });
  test("status: 404 ID not found - article ID does not exist", () => {
    return request(app)
      .patch("/api/articles/1000")
      .send({ inc_votes: 5 })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("article ID does not exist");
      });
  });
});

describe.only("/api/articles", () => {
  test("GET status: 200 - responds with articles array of articles objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeInstanceOf(Array);
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              body: expect.any(String),
              votes: expect.any(Number),
              topic: expect.any(String),
              author: expect.any(String),
              created_at: expect.any(String),
            })
          );
        });
      });
  });
});
