var express = require('express');
var router = express.Router();

var quizController= require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz platform' });
});

router.get('/quizes/answer', quizController.answer);
router.get('/quizes/question', quizController.question);
router.get('/author', function(req,res){
  res.render('author');
});

module.exports = router;
