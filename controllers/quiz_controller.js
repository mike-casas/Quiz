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
    res.render('quizes/index',{quizes: quizes,errors:[]});
  }).catch(function(error){next(error);});
}else{
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index',{quizes: quizes,errors:[]});
  }).catch(function(error){next(error);});
}
};

// Get /quizes/:id
exports.show=function(req,res){
    res.render('quizes/show', {quiz: req.quiz,errors:[]});
};

exports.edit=function(req,res){
  var quiz= req.quiz;
  res.render('quizes/edit',{quiz:quiz,errors:[]});
};

exports.update= function(req, res){

  req.quiz.pregunta= req.body.quiz.pregunta;
  req.quiz.respuesta= req.body.quiz.respuesta;

  req.quiz.validate().then(
    function(err){
      if(err){
        res.render('quizes/edit',{quiz: req.quiz, errors: err.errors});
      }else{
        req.quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('/quizes');});

      }
    });

};
//Get /quizes/:id/answer
exports.answer=function(req,res,next){
      var resultado='Incorrecto';
      if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
        resultado='Correcto';
      }
    res.render('quizes/answer', {quiz: req.quiz,resultado: resultado,errors:[]});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build( // crea objeto quiz
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz, errors: []});
};

exports.destroy=function(req,res){
  req.quiz.destroy().then(function(){
     res.redirect('/quizes');
  }).catch(function(error){next(error);});
};
// POST /quizes/create
exports.create = function(req, res) {

  var quiz = models.Quiz.build( req.body.quiz );

  quiz.validate().then(
    function(err){
      if(err){
        res.render('quizes/new',{quiz:quiz, errors: err.errors});
      }else{
        quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('/quizes');});

      }
    });


};
