const { v1 } = require("uuid");

module.exports = function () {
    const salt = v1();
    const hashedPassword = configHolder.encryptUtility.createHash(salt, this.password);
    this.password = hashedPassword;

    this.salt = salt;

    return Promise.resolve(this);
};
