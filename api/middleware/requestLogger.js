export const requestLogger = (req, res, next) => {
    console.log(`Received ${req.method} request to ${req.path}`);
    console.log(`Request headers: ${JSON.stringify(req.headers)}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`);
    next();
}
