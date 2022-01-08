export const logRequest = (req, res, next) => {
  console.log(`${req.method} request from ${req.originalUrl}`);
  next();
}