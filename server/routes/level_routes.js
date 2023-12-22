const router = require("express").Router();
const { checkAdmin } = require("../middlewares/authMiddleware");
const {createLevel, getLevelsByWingId, getParticularLevel, update, destroy} = require("../controllers/level_controller");
router.route("/").post(checkAdmin, createLevel);
router.route("/:id").patch(checkAdmin, update);
router.route("/:id").delete(checkAdmin, destroy);
router.route("/getlevelbywingid/:wingId").get(getLevelsByWingId);
router.route("/getparticularlevel/:levelId").get(getParticularLevel);   
module.exports = router;