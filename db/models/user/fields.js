module.exports = {
    name: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ["admin", "shopAdmin", "user"],
        requried: true,
        default: "user"
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        trim: true,
    },
    salt: {
        type: String,
        trim: true,
    },
    isAccountLocked: {
        type: Boolean,
        default: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    }
}