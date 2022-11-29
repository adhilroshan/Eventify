var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const Host = require("../models/hostModel");

/* GET hosts listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// register endpoint
router.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const host = new Host({
        name: request.body.name,
        email: request.body.email,
        phoneNo: request.body.phoneNo,
        password: hashedPassword,
      });

      // save the new user
      host
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "Host Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          console.error(error);
          response.status(500).send({
            message: "Error creating host",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      console.log(e);
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint
router.post("/login", (request, response) => {
  // check if email exists
  Host.findOne({ email: request.body.email })

    // if email exists
    .then((host) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, host.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              hostId: host._id,
              hostEmail: host.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: host.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

// register endpoint
router.post("/create-event", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const host = new Host({
        name: request.body.name,
        email: request.body.email,
        phoneNo: request.body.phoneNo,
        password: hashedPassword,
      });

      // save the new user
      host
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "Host Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          console.error(error);
          response.status(500).send({
            message: "Error creating host",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      console.log(e);
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

module.exports = router;
