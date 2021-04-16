export const errorHandler = (error, req, res, next) => {
  if (error) {
    res.status(error.httpStatusCode).send({ message: error.message });
  } else {
    next();
  }
};

export const routeNotFoundHandler = (req, res, next) => {
  if (!req.pathname) {
    res
      .status(404)
      .send({
        message: `${req.protocol}://${req.hostname}:${process.env.PORT}${req.originalUrl} is not implemented`,
      });
  } else {
    next();
  }
};

// export const notFoundErrorHandler = (err, req, res, next) => {
//   if (err.httpStatusCode === 404) {
//     res.status(404).send(err.message || "Error not found!");
//   } else {
//     next(err);
//   }
// };

// export const badRequestErrorHandler = (err, req, res, next) => {
//   if (err.httpStatusCode === 400) {
//     res.status(400).send(err.errorList);
//   } else {
//     next(err);
//   }
// };

// export const forbiddenErrorHandler = (err, req, res, next) => {
//   if (err.httpStatusCode === 403) {
//     res.status(403).send("Forbidden");
//   } else {
//     next(err);
//   }
// };

// export const catchAllErrorHandler = (err, req, res, next) => {
//   res.status(500).send("Generic Server Error");
// };
