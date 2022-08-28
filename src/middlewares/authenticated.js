"use strict";
const jwt = require("jwt-simple");
const moment = require("moment");
const secret = "DMASYSTEM_2022";

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      error: "No authorization the authorization header",
    });
  }

  const token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    const payload = jwt.decode(token, secret);
    if (payload.exp <= moment().unix()) {
      return res.status(401).json({
        error: "Expired token",
      });
    }
    req.user = payload;

    next();
  } catch (error) {
    return res.status(404).json({
      error: 'Invalid or expired token',
    });
  }
};
