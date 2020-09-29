const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Service Centre Model
const ServiceCentre = require("../models/service-centre");

exports.register = (req, res) => {
  const { name, email, password, confirm_password, address, latitude, longitude } = req.body;

  console.log(req.body);

  //Simple validation
  if (!name || !email || !password || !confirm_password || !address || !latitude || !longitude) {
    return res.json({
      status: 400,
      msg: "Please enter all the fields "
    });
  }
  //Check for existing service centre
  ServiceCentre.findOne({ email }).then(serviceCentre => {
    if (serviceCentre)
      return res.json({
        status: 400,
        msg: "Service Centre already exists "
      });

    if (password != confirm_password) {
      return res.json({
        status: 400,
        msg: "Password Didn't match"
      });
    }

    if (password.length < 8) {
      return res.json({
        status: 400,
        msg: "Password should be atleast 8 characters"
      });
    }

    var number = 0;
    var low_alph = 0;
    var up_alph = 0;
    var spl_char = 0;
    for (var i = 0; i < password.length; i++) {
      var ascii = password.charCodeAt(i);
      if (ascii >= 48 && ascii <= 57) {
        number = 1;
      } else if (ascii >= 65 && ascii <= 90) {
        up_alph = 1;
      } else if (ascii >= 97 && ascii <= 122) {
        low_alph = 1;
      } else {
        spl_char = 1;
      }
    }

    if (number != 1 || low_alph != 1 || up_alph != 1 || spl_char != 1) {
      return res.json({
        status: 400,
        msg: "Password not efficient"
      });
    }

    const newServiceCentre = new ServiceCentre({
      name,
      email,
      password,
      address,
      latitude,
      longitude
    });

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newServiceCentre.password, salt, (err, hash) => {
        if (err) throw err;
        newServiceCentre.password = hash;
        newServiceCentre.save().then(serviceCentre => {
          jwt.sign({ id: serviceCentre.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              status: 200,
              users: {
                id: serviceCentre.id,
                name: serviceCentre.name,
                email: serviceCentre.email,
                address: serviceCentre.address,
                latitude: serviceCentre.latitude,
                longitude: serviceCentre.longitude
              }
            });
          });
        });
      });
    });
  });
};
