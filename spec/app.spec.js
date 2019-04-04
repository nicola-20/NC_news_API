process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const request = supertest(app);

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    //TOPICS
    describe("/topics", () => {
      describe("DEFAULT BEHEAVIOURS", () => {
        it("GET status 200: responds with an array of topics objects with certain keys", () => {
          return request
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              body.topics.forEach(topic => {
                expect(topic).to.contain.keys("slug", "description");
              });
            });
        });
        it("GET STATUS 200 by sending back an array of 2 topics", () => {
          return request
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              expect(body.topics).to.have.lengthOf(2);
            });
        });
      });
      describe("ERROR HANDLING FOR TOPICS", () => {
        it("STATUS 405 for invalid method for topics", () => {
          const invalidMethods = ["post", "patch", "delete", "put"];
          const methodPromises = invalidMethods.map(method =>
            request[method]("/api/topics").expect(405)
          );
          return Promise.all(methodPromises);
        });
      });
    });
    //ARTICLES
    describe("/articles", () => {
      describe("DEFAULT BEHEAVIOURS", () => {
        it("GET status 200: responds with an array of artiles objects with certain keys", () => {
          return request
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
              body.articles.forEach(article => {
                expect(article).to.contain.keys(
                  "article_id",
                  "title",
                  "body",
                  "votes",
                  "topic",
                  "author",
                  "created_at",
                  "comment_count"
                );
              });
            });
        });
      });
      describe("ERROR HANDLING FOR ARTICLES ", () => {
        it('"STATUS 405 for invalid method for articles"', () => {
          const invalidMethods = ["post", "patch", "delete", "put"];
          const methodPromises = invalidMethods.map(method =>
            request[method]("/api/topics").expect(405)
          );
          return Promise.all(methodPromises);
        });
      });
    });
  });
});
