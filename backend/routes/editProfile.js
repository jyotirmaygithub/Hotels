const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploadImage = require("./trial")
const fetchUserId = require("../middleware/fetchUserId");

router.get("/edit-profile", fetchUserId, async (req, res) => {
  try {
    const { name, picture } = req.body;
    const userDocument = await User.findById({ _id: req.userId });
    if (userDocument) {
      // updating the name field.
      userDocument.name = name;
      // Check if the picture field is present in the request
      if (picture !== undefined) {
        // Update the picture field only if a new picture is provided
        const imageUrl = await uploadImage(picture);
        console.log("image url = " ,imageUrl)
        userDocument.picture = imageUrl;
      }
      // updating the existing  document with the updated fields
      await userDocument.save();
    } else {
      return res.status(404).send("No such user exists!");
    }
    res.send({ userdocument: userDocument });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
