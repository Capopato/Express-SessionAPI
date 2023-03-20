import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt.util";
import { reissueToken } from "../utils/reissueToken.util";

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  let accessToken = "";
  let refreshToken = "";

  // Get all the cookies from headers
  const headers = req.headers.cookie;

  if (!headers) {
    return res.status(400).send("Headers not found.");
  }
  // The tokens are split by '; '.
  const cookies = headers.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    // The word accessToken/refreshToken is split from the actual token by '='
    const cookie = cookies[i].split("=");
    if (cookie[0].includes("accessToken")) {
      accessToken = cookie[1];
    } else if (cookie[0].includes("refreshToken")) {
      refreshToken = cookie[1];
    }
  }

  if (!accessToken && !refreshToken) {
    return res.status(401).send("Session not allowed.");
  }

  if (accessToken) {
    const valid = verifyJWT(accessToken);
    if (valid.expired == false) {
      return next();
    } else {
      return res.status(403);
    }
  }

  if (!accessToken && refreshToken) {
    const newToken = await reissueToken(refreshToken);
    console.log(newToken);
    next();
    /**
     * Issue a new refreshtoken */
  }

  // res.status(200).send("Ok");
};
