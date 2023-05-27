import { NextFunction } from 'express';

// check if user is logged in
function requireUser(req: any, res: any, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    res.status(401);
    next({
      message: 'You must be logged in to perform this action',
    });
  }
}

module.exports = requireUser;
