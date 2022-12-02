var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const fs = require("fs");

const Host = require("../models/hostModel");
const Event = require("../models/eventModel");
const auth = require("../auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const getUserFromToken = require("../controllers/controllers");

/* GET Requests */
/* ---------------------------------------------------------------- */

// Get all Events

router.get("/", auth, async function (req, res, next) {
  const events = await Event.find({});
  res.status(200).json(events);
});

// Get all Events that are created by this host
router.get("/events", auth, async function (req, res, next) {
  //   get the token from the authorization header
  const user = await getUserFromToken(req);
  const events = await Event.find({ host: user.hostId });
  res.status(200).json(events);
});

/* POST Requests */
/* ---------------------------------------------------------------- */
// register endpoint
router.post("/register", (request, response) => {
  console.log(request.body);
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
        request: request,
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

// create event endpoint
router.post("/create-event", auth, async (request, response) => {
  console.log(request.body);
  const user = await getUserFromToken(request);
  // hash the pass
  bcrypt
    .hash(request.body.pass, 10)
    .then((hashedPass) => {
      // create a new event instance and collect the data
      const event = new Event({
        name: request.body.name,
        loc: request.body.loc,
        description: request.body.description,
        pass: hashedPass,
        eventUrl: request.body.eventUrl,
        subEvents: request.body.subEvents,
        organizers: request.body.organizers,
        host: user.hostId,
        img: request.body.img,
      });

      // save the new user
      event
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "Event Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          console.error(error);
          response.status(500).send({
            message: "Error creating event",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      console.error(e);
      response.status(500).send({
        message: "Pass was not hashed successfully",
        e,
      });
    });
});

router.post(
  "/upload/images",
  auth,
  upload.single("image"),
  async (req, res) => {
    console.log(req);
    if (!req.file) {
      res.send({ code: 500, msg: "err", req: req });
    } else {
      const imageType = req.file.mimetype;
      const imageName = req.file.filename;
      res.send({
        code: 200,
        msg: "upload successful",
        imageName: imageName,
        imageType: imageType,
      });
      // console.log(imagePath);
    }
  }
);

router.get("/images/:imageName", async (req, res) => {
  // do a bunch of if statements to make sure the user is
  // authorized to view this image, then
  console.log(req.body);
  const imageName = req.params.imageName;
  const readStream = fs.createReadStream(`uploads/${imageName}`);
  readStream.pipe(res);
});

/* PATCH Requests */
/* ---------------------------------------------------------------- */
router.patch("/events/:id", auth, async (req, res) => {
  const { id } = req.params;

  const event = await Event.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!event) {
    return res.status(404).json({ error: "Not Found" });
  }
  res.status(200).json(event);
});

/* DELETE Requests */
/* ---------------------------------------------------------------- */

router.delete("/events/:id", auth, async function (req, res) {
  const { id } = req.params;

  const event = await Event.findByIdAndDelete({ _id: id });
  if (!event) {
    return res.status(404).json({ error: "Not Found" });
  }
  res.status(200).json(event);
});

module.exports = router;
