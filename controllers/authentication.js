exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error("Invaid arguments!");
            error.statusCode = 401;
            return next(error);
        }

        let user = await domain.User.findOne({
            email
        });

        if (!user) {
            user = await new domain.User({
                email,
                password
            }).save();
            createTokenAndReturn(user, res, next);
            return;
        }

        if (!checkIfPasswordValid(user, password)) {
            const error = new Error("Email or Password does not matched!");
            error.statusCode = 401;
            return next(error);
        }

        createTokenAndReturn(user, res, next);

    } catch (err) {
        next(err);
    }
};

/**
 * 
 * @param user      user who is trying to login  
 * @param password  entered password by user
 * 
 * @description     Tries to match the entered password with user existing password, by creating hash of entered password,
 *                  if both password matches, then return true else fale.  
 */
const checkIfPasswordValid = (user, password) => {
    try {
        const hash = configHolder.encryptUtility.createHash(user.salt, password);

        return hash === user.password;
    } catch (err) {
        throw new Error(err);
    }
};


/**
 * 
 * @param user              User which is trying to login  
 * @param { Object } res    Response object, used in order to send response
 * @param callback          next funcion to throw errors in case any
 * 
 * @description     Tries to generate JWT token using global utility createToken function of globally defined jwtUtility 
 *                  and fetch the complete user and send token and user in response.  
 */
const createTokenAndReturn = async (user, res, callback) => {
    try {
        const payload = {
            userId: user._id,
            type: "AUTH_TOKEN",
            meta: {
                "APP_NAME": "WeatherAuth"
            }
        };
        const token = configHolder.jwtUtility.createToken(payload);

        user = await domain.User.findOne({
            _id: user._id,
        }).select('-__v -salt -password');

        const response = views.JsonView({ user, token });

        return res.status(200).json(response);
    } catch (err) {
        return callback(err);
    }
};
