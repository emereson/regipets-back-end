import jwt from 'jsonwebtoken';
import logger from './logger.js';
import { JWT_EXPIRE_IN, SECRET_JWT_SEED } from '../../config.js';

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      SECRET_JWT_SEED,
      {
        expiresIn: JWT_EXPIRE_IN,
      },
      (err, token) => {
        if (err) {
          logger.info(err);
          reject(err);
        }

        resolve(token);
      }
    );
  });
};

export { generateJWT };
