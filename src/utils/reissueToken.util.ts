import { verifyJWT } from "./jwt.util";

export const reissueToken = (refreshToken: string) => {
  const valid = verifyJWT(refreshToken);

  console.log(valid);

  if (!valid.decoded) {
    return "";
  }
};
