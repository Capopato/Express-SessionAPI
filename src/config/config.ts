import dotenv from "dotenv";

dotenv.config();

const mongoDBUsername = process.env.mongoDBUsername || "";
const mongoDBpassword = process.env.mongoDBpassword || "";
const mongoURI = `mongodb+srv://${mongoDBUsername}:${mongoDBpassword}@sessionapi.pinykug.mongodb.net/?retryWrites=true&w=majority`;
const port = process.env.port || 3001;
const publicKey = process.env.publicKey || "";
const privateKey = process.env.privateKey || "";

export default {
  mongoDBUsername,
  mongoDBpassword,
  mongoURI,
  port,
  publicKey,
  privateKey,
};
