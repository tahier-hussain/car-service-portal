//Model
const User = require("../models/user");
const RequestedService = require("../models/requested-service");

exports.create = (req, res) => {
  console.log(req.body);
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      const newPost = new RequestedService({
        service_name: req.body.service_name,
        service_id: req.body.service_id,
        centre_id: req.body.centre_id,
        user_id: req.body.user_id,
        cost: req.body.cost
      });

      newPost
        .save()
        .then(data => res.json(data))
        .catch(() =>
          res.status(400).json({
            msg: "Something went wrong"
          })
        );
    });
};

exports.get = (req, res) => {
  Post.find()
    .sort({ register_date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getUserPost = (req, res) => {
  RequestedService.find({ $and: [{ centre_id: req.body.centre_id }, { user_id: req.body.user_id }] })
    .sort({ register_date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.update = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      Post.find({ auth_id: req.user.id })
        .then(() => {
          Post.findByIdAndUpdate(req.body.id, req.body)
            .then(post => res.json(post))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};

exports.delete = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      Post.find({ auth_id: req.user.id })
        .then(() => {
          Post.findByIdAndDelete(req.body.id)
            .then(post => res.json(post))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};
