// api middleware to handle errors rather than a html page
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let msg = err.message;
  //cast error in mongoose
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    msg = "Resource not found";
  }

  res.status(statusCode).json({
    msg,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  next();
};

export { notFound, errorHandler };
