const router = require("express").Router();
const { checkAdmin,checkLogin } = require("../middlewares/authMiddleware");
const { create, submitAssignment,verifyAssignment, update, destroy, getAssignmentbyLevelId, getAssignmentByAssignmentId } = require("../controllers/assignment_controller.js");
const { assignmentMiddleware } = require("../middlewares/assignment-middleware.js");

router.post('/', checkAdmin, create);
router.get('/:id', checkAdmin, getAssignmentbyLevelId);
router.patch('/:id', checkAdmin, update);
router.delete('/:id', checkAdmin, destroy);

router.post('/submit/:id',checkLogin ,assignmentMiddleware, submitAssignment);
router.post('/verify/:id',checkAdmin, verifyAssignment);

router.get('/submissions/:id', checkAdmin, getAssignmentByAssignmentId);
module.exports = router;