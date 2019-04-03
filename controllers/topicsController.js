const { selectTopics } = require("../models/topicsModels");

exports.getTopics = (req, res, next) => {
  selectTopics().then(topics => {
    console.log(topics, "controller");
    res.status(200).json({ topics });
  });
};
