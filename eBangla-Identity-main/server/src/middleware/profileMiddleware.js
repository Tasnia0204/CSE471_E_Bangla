export const ensureProfileComplete = (req, res, next) => {
  if (req.user && req.user.isProfileComplete) {
    next();
  } else {
    res.status(403).json({
      message: "Please complete your profile to access this feature.",
      isProfileIncomplete: true,
    });
  }
};
