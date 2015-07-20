var express = require('express');
var router = express.Router();

var quizController= require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz platform' });
});

//autoload de comandos con :quizid
router.param('quizId',quizController.load);

//definicion de rutas
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/author', function(req,res){
  res.render('author');
});

module.exports = router;
