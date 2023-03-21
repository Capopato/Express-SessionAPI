import dotenv from "dotenv";

dotenv.config();

const mongoDBUsername = process.env.mongoDBUsername || "";
const mongoDBpassword = process.env.mongoDBpassword || "";
const mongoURI = `mongodb+srv://${mongoDBUsername}:${mongoDBpassword}@sessionapi.pinykug.mongodb.net/?retryWrites=true&w=majority`;
const port = process.env.port || 3001;
const publicKey = process.env.publicKey || "";
const privateKey = process.env.privateKey || "";
const accessTokenLT = "1m";
const refreshTokenLT = "7d";
const cookieAccessTokenLT = new Date(Date.now() + 1 * 60 * 1000);
const cookieRefreshTokenLT = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export default {
  mongoDBUsername,
  mongoDBpassword,
  mongoURI,
  port,
  publicKey,
  privateKey,
  accessTokenLT,
  refreshTokenLT,
  cookieAccessTokenLT,
  cookieRefreshTokenLT,
};
