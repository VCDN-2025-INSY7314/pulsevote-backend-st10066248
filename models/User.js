const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // or 'bcryptjs' if you swapped

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const bcryptLib = bcrypt; // support either bcrypt or bcryptjs
  return bcryptLib.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
