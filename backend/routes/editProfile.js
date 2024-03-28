const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploadImage = require("../utils/uploadCloudinary");
const fetchUserId = require("../middleware/fetchUserId");

// Route : to update or edit user profile.
router.post("/edit-profile", fetchUserId, async (req, res) => {
  try {
    const { name, picture } = req.body;
    const userDocument = await User.findById({ _id: req.userId });
    if (userDocument) {
      // updating the name field.
      userDocument.name = name;
      // Check if the picture field is present in the request
      if (picture) {
        // Update the picture field only if a new picture is provided
        const imageUrl = await uploadImage(picture);
        if (imageUrl) {
        userDocument.picture = imageUrl;
        }
      }
      await userDocument.save();
    } else {
      return res.status(404).send("No such user exists!");
    }
    res.send({ "edit user document": userDocument });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
