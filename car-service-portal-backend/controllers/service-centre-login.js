const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Service Centre Model
const ServiceCentre = require("../models/service-centre");

exports.login = (req, res) => {
  console.log("Hello");
  const { email, password } = req.body;
  //Simple validation
  if (!email || !password) {
    return res.json({
      status: 400,
      msg: "Please enter all the fields "
    });
  }

  //Check for existing service centre
  ServiceCentre.findOne({ email }).then(serviceCentre => {
    if (!serviceCentre)
      return res.json({
        status: 400,
        msg: "Service centre does not exist "
      });

    //Validate password
    bcrypt.compare(password, serviceCentre.password).then(isMatch => {
      if (!isMatch)
        return res.json({
          status: 400,
          msg: "Invalid Credentials"
        });

      jwt.sign({ id: serviceCentre.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          status: 200,
          token,
          users: {
            id: serviceCentre.id,
            name: serviceCentre.name,
            description: serviceCentre.description,
            email: serviceCentre.email,
            address: serviceCentre.address,
            latitude: serviceCentre.latitude,
            longitude: serviceCentre.longitude,
            type: "service",
            message: "Logged in successfully"
          }
        });
      });
    });
  });
};
