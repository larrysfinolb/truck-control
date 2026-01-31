import { JwtPayload } from "../interfaces/jwtPayload";
import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token: string | null) => {
  if (!token) return false;

  try {
    const payload = jwtDecode<JwtPayload>(token);

    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp > currentTime;
  } catch {
    return false;
  }
};

export const decodeToken = (token: string | null) => {
  if (!token) return null;

  try {
    const payload = jwtDecode<JwtPayload>(token);
    return payload;
  } catch {
    return null;
  }
};
