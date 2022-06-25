const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) res.status(401).json({ message: 'Token not provided' });

  const parts = authHeader.split(' ');
  if (!parts.length === 2) return res.status(401).send({ error: 'Token error' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({
      error: 'Token is not in a valid format, please try "Bearer (token)"'
    });

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) throw res.status(401).send({ error: 'Token is not valid' });
    req.userId = decoded.id;
  });
  return next();
};
