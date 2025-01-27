const errorHandler = (err, req, res) => {
  res.status(err?.statusCode || 500).send({ message: err?.message || err })
}

export default errorHandler
