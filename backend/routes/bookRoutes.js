const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const verifyToken = require("../middleware/verifyToken");

router.post("/publish", verifyToken, bookController.publish);
router.get("/search", verifyToken, bookController.search);
router.put("/unpublish/:bookId", verifyToken, bookController.unpublish);
router.get("/user", verifyToken, bookController.getUserBooks);
router.get("/published", bookController.getPublishedBooks);

module.exports = router;
