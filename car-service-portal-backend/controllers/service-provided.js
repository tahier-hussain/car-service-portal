//Model
const ServiceCentre = require("../models/service-centre");
const ServiceProvided = require("../models/service-provided");
const serviceCentre = require("../models/service-centre");

exports.create = (req, res) => {
  console.log(req.body);
  ServiceCentre.findById(req.user.id)
    .select("-password")
    .then(user => {
      const newService = new ServiceProvided({
        service_name: req.body.service_name,
        service_centre_id: req.body.service_centre_id,
        cost: req.body.cost
      });

      newService
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
  ServiceProvided.find()
    .sort({ register_date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getUserService = (req, res) => {
  ServiceCentre.findById(req.user.id).then(serviceCentre => {
    ServiceProvided.find({ service_centre_id: serviceCentre.id })
      .sort({ register_date: -1 })
      .then(posts => res.json(posts))
      .catch(() => res.status(400).json({ msg: "Something went wrong" }));
  });
};

exports.getOne = (req, res) => {
  ServiceProvided.find({ service_centre_id: req.body.id })
    .then(data => res.json(data))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.update = (req, res) => {
  ServiceCentre.findById(req.user.id)
    .select("-password")
    .then(user => {
      ServiceProvided.find({ service_centre_id: req.user.id })
        .then(() => {
          ServiceProvided.findByIdAndUpdate(req.body.id, req.body)
            .then(post => res.json(post))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};

exports.delete = (req, res) => {
  ServiceCentre.findById(req.user.id)
    .select("-password")
    .then(user => {
      ServiceProvided.find({ service_centre_id: req.user.id })
        .then(() => {
          ServiceProvided.findByIdAndDelete(req.body.id)
            .then(post => res.json(post))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};
