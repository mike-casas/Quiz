// Autoload :id de comentarios
exports.load = function(req, res, next, commentId) {
  models.Comment.find({
            where: {
                id: Number(commentId)
            }
        }).then(function(comment) {
      if (comment) {
        req.comment = comment;
        next();
      } else{next(new Error('No existe commentId=' + commentId))}
    }
  ).catch(function(error){next(error)});
};



module.exports = function(sequelize, DataTypes){
  return sequelize.define(
    'Comment',
    {texto:{
        type:DataTypes.STRING,
        validate: {notEmpty:{msg:"-> Falta Comentario"}}
      },
      publicado:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
      }
    }
  );
};

// GET /quizes/:quizId/comments/:commentId/publish
exports.publish = function(req, res) {
  req.comment.publicado = true;

  req.comment.save( {fields: ["publicado"]})
    .then( function(){ res.redirect('/quizes/'+req.params.quizId);} )
    .catch(function(error){next(error)});

};
