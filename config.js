import dotenv from 'dotenv';

dotenv.config();

export const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  PORT,
  WEBHOOK_URL,
  MP_ACCESS_TOKEN,
  FRONTEND_URL,
  SECRET_JWT_SEED,
  JWT_EXPIRE_IN,
} = process.env;
