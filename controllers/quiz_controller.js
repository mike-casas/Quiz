var models= require('../models/models.js');


// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId));}
    }
  ).catch(function(error){next(error);});
};

// GET /quizes

exports.index= function(req,res){
  if(req.query.search){
     search='%'+req.query.search.trim()+'%';
     search=search.replace(/\s+/g,"%");
  models.Quiz.findAll({where: ["upper(pregunta) like ?", search.toUpperCase()]}).then(function(quizes){
    res.render('quizes/index',{quizes: quizes});
  }).catch(function(error){next(error);});
}else{
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index',{quizes: quizes});
  }).catch(function(error){next(error);});
}
};

// Get /quizes/:id
exports.show=function(req,res){
    res.render('quizes/show', {quiz: req.quiz});
};

//Get /quizes/:id/answer
exports.answer=function(req,res,next){
      var resultado='Incorrecto';
      if (req.query.respuesta === req.quiz.respuesta) {
        resultado='Correcto';
      }
    res.render('quizes/answer', {quiz: req.quiz,resultado: resultado});
};

