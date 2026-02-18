module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            // Basically, "do" the body of the fxn
            // we pass the req and res because we might use it
            // in the implementation of the route handler
            await handler(req, res);
        }
        catch (ex) {
            // then catch any errors
            // and pass to the error middleware
            next(ex);
        }
    }
}