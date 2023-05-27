"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// check if user is logged in
function requireUser(req, res, next) {
    if (req.user) {
        next();
    }
    else {
        res.status(401);
        next({
            message: 'You must be logged in to perform this action',
        });
    }
}
module.exports = requireUser;
