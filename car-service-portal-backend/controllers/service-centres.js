//Model
const ServiceCentre = require("../models/service-centre");

exports.get = (req, res) => {
  ServiceCentre.find()
    .sort({ register_date: -1 })
    .then(async serviceCentres => {
      let output = [];
      let index = 0;
      console.log(serviceCentres);
      for (let i = 0; i < serviceCentres.length; i++) {
        if (await (Math.abs(serviceCentres[i].latitude - req.body.latitude) < 2)) {
          output[index++] = serviceCentres[i];
        }
      }
      res.json(output);
    })
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getOne = (req, res) => {
  ServiceCentre.findById(req.body.id)
    .sort({ register_date: -1 })
    .then(data => res.json(data))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};
