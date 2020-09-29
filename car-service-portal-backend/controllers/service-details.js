//Model
const ServiceCentre = require("../models/service-centre");
const ServiceProvided = require("../models/service-provided");
const Service = require("../models/service");

exports.create = (req, res) => {
  ServiceCentre.findById(req.user.id)
    .select("-password")
    .then(user => {
      const newPost = new Post({
        title: req.body.title,
        post: req.body.post,
        auth_id: req.user.id,
        auth_user: user.name
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

exports.getServiceDetails = async (req, res) => {
  let output = [];
  output[0] = {};
  output[0] = await ServiceProvided.find({ service_centre_id: req.body.id })
    .sort({ register_date: -1 })
    .then(serviceProvided => {
      return serviceProvided;
    });
  let service = await Service.find();
  let index = 0;
  for (let i = 0; i < service.length; i++) {
    let flag = true;
    for (let j = 0; j < output[0].length; j++) {
      if (await (service[i]._id === output[0][j].service_id)) {
        flag = false;
      }
    }
    if (await (flag === true)) {
      output[1][index++] = service[i];
    }
  }

  await res.json(output);
};

exports.getUserPost = (req, res) => {
  User.findById(req.user.id).then(user => {
    Post.find({ auth_id: user.id })
      .sort({ register_date: -1 })
      .then(posts => res.json(posts))
      .catch(() => res.status(400).json({ msg: "Something went wrong" }));
  });
};

exports.addDescription = (req, res) => {
  ServiceCentre.findByIdAndUpdate(req.body.id, req.body)
    .then(post => res.json(post))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
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
