const fields = require('./fields');
const beforeSave = require("./hooks/before-save");

const UserSchema = new MongooseSchema(fields, {
    timestamps: true
})

UserSchema.pre("save", beforeSave);

module.exports = MongooseConnect.model("User", UserSchema);
