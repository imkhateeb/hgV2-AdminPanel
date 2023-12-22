const router=require("express").Router();
const {checkAdmin}=require("../middlewares/authMiddleware");
const {createTopic,getTopics, getTopicsByLevel,update,destroy}=require("../controllers/topic_controller");

router.route("/").post(checkAdmin,createTopic);
router.route("/:id").patch(checkAdmin,update);
router.route("/:id").delete(checkAdmin,destroy);
router.route("/all").get(getTopics);
router.route("/gettopicsbylevel/:levelId").get(getTopicsByLevel);
module.exports=router;