import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, _next) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }
  res
    .status(500)
    .json({ message: isProd ? 'Oops... Please try again!' : err.message });
};
