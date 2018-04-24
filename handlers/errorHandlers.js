exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

exports.mongoError = (err, req, res, next) => {
	if(!err.errors) return next(err);

	const errorKeys = Object.keys(err.errors);
	errorKeys.forEach(key => res.status(422).send({ error: err.errors[key].message}));
};