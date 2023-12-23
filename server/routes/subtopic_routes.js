const router=require("express").Router();
const {checkAdmin}=require("../middlewares/authMiddleware");
const {createSubtopic,addResource, getSubtopics, destroy, update}=require("../controllers/subtopic_controller");

router.route("/").post(checkAdmin,createSubtopic);
router.route("/:id").delete(checkAdmin,destroy);
router.route("/addResource").patch(checkAdmin,addResource);
router.route("/:id").patch(checkAdmin,update);
router.route("/getsubtopics/:topicId").get(getSubtopics);
module.exports=router;