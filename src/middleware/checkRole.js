const checkRole = (allowedRole) => {
  return (req, res, next) => {
    const role = req.headers["x-role"];

    if (!role || role !== allowedRole) {
      return res.status(403).json({
        error: "Forbidden: you do not have permission to perform this action",
      });
    }

    next();
  };
};

module.exports = checkRole;
