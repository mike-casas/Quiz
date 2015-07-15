var models= require('../models/models.js');


exports.question=function(req,res){
  models.Quiz.findAll().then(function(quiz){
    res.render('quizes/question', {pregunta: quiz[0].pregunta});
  });
};

exports.answer=function(req,res,next){
   models.Quiz.findAll().then(function(quiz){
      patter=  new RegExp(quiz[0].respuesta,'i');
        if (req.query.respuesta.match(patter)) {
            res.render('quizes/answer', {resultado: 'Correcto'});
        }else{
            res.render('quizes/answer', {resultado: 'Incorrecto'});
        }
   });
};

