//Model
const Service = require("../models/service");

exports.create = (req, res) => {
  const newService = new Service({
    service: req.body.service
  });

  newService
    .save()
    .then(data => res.json(data))
    .catch(() =>
      res.status(400).json({
        msg: "Something went wrong"
      })
    );
};

exports.get = (req, res) => {
  Service.find()
    .sort({ register_date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.update = (req, res) => {
  Service.findByIdAndUpdate(req.body.id, req.body)
    .then(service => res.json(service))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.delete = (req, res) => {
  Post.findByIdAndDelete(req.body.id)
    .then(post => res.json(post))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};
