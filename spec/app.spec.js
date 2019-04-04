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
        it("GET status 200:responds with a comment count for an article_id", () => {
          return request
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles[8].comment_count).to.eql("2");
            });
        });
      });
      describe("ARTICLE QUERIES", () => {
        it("GET STATUS 200 for an author query", () => {
          return request
            .get("/api/articles?author=butter_bridge")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.length).to.equal(3);
            });
        });
      });
      //REST QUERIES INGORED
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
    //ARTICLES/:ARTICLE_ID
    describe("/articles/:article_id", () => {
      it("GET STATUS 200 returns an article with specific id", () => {
        return request
          .get("/api/articles/1")
          .expect(200)
          .then(({ body: { articles } }) => {
            console.log(articles, "id");
            expect(articles).to.eql([
              {
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2018-11-15T00:00:00.000Z",
                votes: 100,
                comment_count: "13"
              }
            ]);
          });
      });
    });
  });
});
