const { Router } = require("express");
const { validate } = require("express-validation");
const { loginController } = require("../../controllers/authentication");
const { getWeatherLocation, getWeatherForcast } = require("../../controllers/user");
const validationSchema = require("../../application/validations");
const { canAccess } = require("../../application/middlewares/access");
const authenticated = require("../../application/middlewares/authentication");

const router = Router();

router.post("/login",
    validate(validationSchema.loginValidation, {}, {}),
    canAccess(["anonymous"]),
    loginController,
).get('/search/:location',
    canAccess(["anonymous"]),
    getWeatherLocation
).get('/weather/:location',
    authenticated,
    canAccess(["user"]),
    getWeatherForcast
);

module.exports = router;