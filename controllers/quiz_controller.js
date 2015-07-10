exports.question=function(req,res,next){
    res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

exports.answer=function(req,res,next){
   patter=  new RegExp('Roma','i');
    if (req.query.respuesta.match(patter)) {
        res.render('quizes/answer', {resultado: 'Correcto'});
    }else{
        res.render('quizes/answer', {resultado: 'Incorrecto'});
    }
};

