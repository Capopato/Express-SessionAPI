import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import config from "../config/config";

export interface userModel extends Document {
  username: string;
  password: string;
  passwordCheck: string;
}

const userSchema: Schema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    passwordCheck: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this as userModel;
  const salt = 10;

  if (user.password) {
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
  }
  next();
});

export default mongoose.model<userModel>("User", userSchema);
