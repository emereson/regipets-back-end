import express, { Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';

import { AppError } from './utils/AppError.js';
import { globalErrorHandler } from './utils/errors.js';
import { mascotaRouter } from './modules/mascotas/mascota.routes.js';
import { userRouter } from './modules/user/user.routes.js';
import { productoRouter } from './modules/producto/producto.routes.js';
import { pedidoRouter } from './modules/checkout/pedido/pedido.routes.js';
import { razaRouter } from './modules/razas/raza.routes.js';
import { especieRouter } from './modules/especies/especie.routes.js';
import { departamentosRouter } from './modules/ubigeos/departamentos/departamentos.routes.js';
import { convenioRouter } from './modules/convenio/convenio.routes.js';

const app = express();

app.set('trust proxy', 1);
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in one hour.',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(hpp());
app.use('/api/v1', limiter);
app.use('/api/v1/mascota', mascotaRouter);
app.use('/api/v1/raza', razaRouter);
app.use('/api/v1/especie', especieRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/producto', productoRouter);
app.use('/api/v1/pedido', pedidoRouter);
app.use('/api/v1/departamentos', departamentosRouter);
app.use('/api/v1/convenios', convenioRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server! 💀`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    next(err);
  }
});

app.use(globalErrorHandler);

export { app };
