const { expect } = require("chai");
const {
  reformDate,
  articleOrigin,
  reformComment
} = require("../db/utils/assistanceFunctions");

xdescribe("reformDate", () => {
  it("can take an array of an object and return the date key reformed to YYYY-MM-DD", () => {
    const oldDate = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const newDate = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(oldDate[0].created_at).toISOString().slice(0, 10),
        votes: 100
      }
    ];
    expect(reformDate(oldDate)).to.eql(newDate);
  });
  it("can take an array with multiple objects an returns the right date format ", () => {
    const oldDate = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    const newDate = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(oldDate[0].created_at).toISOString().slice(0, 10),
        votes: 100
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: new Date(oldDate[1].created_at).toISOString().slice(0, 10)
      }
    ];
    expect(reformDate(oldDate)).to.eql(newDate);
  });
  describe("articleOrigin", () => {
    it("can return an object with key title assinged to article_id", () => {
      const insertedOrigin = [
        { article_id: 1, title: "Living in the shadow of a great man" }
      ];
      expect(articleOrigin(insertedOrigin)).to.eql({
        "Living in the shadow of a great man": 1
      });
    });
    it("can return multiple objects with key title assigned to article_id", () => {
      const insertedOrigin = [
        { article_id: 1, title: "Living in the shadow of a great man" },
        { article_id: 2, title: "Running a Node App" }
      ];
      expect(articleOrigin(insertedOrigin)).to.eql({
        "Living in the shadow of a great man": 1,
        "Running a Node App": 2
      });
    });
  });
  describe("reformComment", () => {
    it("will return a reformed comment object  ", () => {
      const obj = { "They're not exactly dogs, are they?": 9 };
      const oldComment = [
        {
          body:
            "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          belongs_to: "They're not exactly dogs, are they?",
          created_by: "butter_bridge",
          votes: 16,
          created_at: 1511354163389
        }
      ];
      const newComment = [
        {
          body:
            "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          article_id: 9,
          author: "butter_bridge",
          votes: 16,
          created_at: new Date(oldComment[0].created_at)
            .toISOString()
            .slice(0, 10)
        }
      ];
      expect(reformComment(oldComment, obj)).to.eql(newComment);
    });
    it("will return a reformed array of comments  ", () => {
      const obj = {
        "They're not exactly dogs, are they?": 9,
        "Living in the shadow of a great man": 1
      };
      const oldComments = [
        {
          body:
            "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          belongs_to: "They're not exactly dogs, are they?",
          created_by: "butter_bridge",
          votes: 16,
          created_at: 1511354163389
        },
        {
          body:
            "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
          belongs_to: "Living in the shadow of a great man",
          created_by: "butter_bridge",
          votes: 14,
          created_at: 1479818163389
        }
      ];
      const newComments = [
        {
          body:
            "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          article_id: 9,
          author: "butter_bridge",
          votes: 16,
          created_at: new Date(oldComments[0].created_at)
            .toISOString()
            .slice(0, 10)
        },
        {
          body:
            "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
          article_id: 1,
          author: "butter_bridge",
          votes: 14,
          created_at: new Date(oldComments[1].created_at)
            .toISOString()
            .slice(0, 10)
        }
      ];
      expect(reformComment(oldComments, obj)).to.be.eql(newComments);
    });
  });
});
