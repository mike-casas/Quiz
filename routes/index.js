var express = require('express');
var router = express.Router();

var quizController= require('../controllers/quiz_controller');
var commentController= require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz platform' ,errors:[]});
});

//autoload de comandos con :quizid
router.param('quizId',quizController.load);

router.param('commentId',commentController.load);


// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

//definicion de rutas
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired,quizController.destroy);
router.get('/quizes/new', sessionController.loginRequired,quizController.new);
router.post('/quizes/create', sessionController.loginRequired,quizController.create);

// comments
router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.loginRequired,commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', sessionController.loginRequired,commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',sessionController.loginRequired,commentController.publish);

// end comments
router.get('/author', function(req,res){
  res.render('author',{errors:[]});
});

module.exports = router;
