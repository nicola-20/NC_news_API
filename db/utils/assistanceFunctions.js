exports.reformDate = arr => {
  let date = arr.map(obj => ({
    ...obj,
    created_at: new Date(obj.created_at).toISOString().slice(0, 10)
  }));
  return date;
};

// exports.reformDate = arr => {
//   let date = arr.reduce((object, item) => {
//     object[item.created_at] = new Date(item.created_at)
//       .toISOString()
//       .slice(0, 10);
//     return object;
//   });
//   return date;
// };

exports.articleOrigin = insertedOrigin => {
  const reducedOrigin = insertedOrigin.reduce((object, item) => {
    object[item.title] = item.article_id;
    return object;
  }, {});
  return reducedOrigin;
};

// exports.reformComment = insertedComment => {
//   const reducedComment = insertedComment.reduce((object, item) => {
//     object[item.belongs_to] = item.article_id;
//     return object;
//   });
//   return reducedComment;
// };

// exports.reformAuthor = insertedAuthor => {
//   const reducedAuthor = insertedAuthor.reduce((object, item) => {
//     object[item.created_by] = item.author;
//     return object;
//   });
//   return reducedAuthor;
// };

exports.reformComment = (arr, obj) => {
  let comment = arr.map(item => ({
    article_id: obj[item.belongs_to],
    body: item.body,
    author: item.created_by,
    votes: item.votes,
    created_at: new Date(item.created_at).toISOString().slice(0, 10)
  }));
  return comment;
};
