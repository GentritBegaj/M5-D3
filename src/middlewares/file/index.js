const checkFileType = (types) => (req, res, next) => {
  const acceptedMimeTypes = types.includes(req.file.mimetype);
  console.log({ acceptedMimeTypes });

  if (!acceptedMimeTypes) {
    res.status(400).send({
      message: `Only ${types.join(",")} mime-types are accepted. You sent ${
        req.file.mimetype
      }`,
    });
  } else {
    next();
  }
};

export default checkFileType;
