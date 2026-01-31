import { create } from "zustand";
import { isTokenValid } from "../utils/tokenValidation";
import { authStorage } from "../utils/authStorage";
import { devtools } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (token: string) => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

const getInitialState = () => {
  if (typeof window === "undefined") return false;

  const token = authStorage.getToken();
  return isTokenValid(token);
};

const INITIAL_STATE: AuthState = {
  isAuthenticated: getInitialState(),
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      ...INITIAL_STATE,
      login: (token: string) => {
        authStorage.setToken(token);
        set({ isAuthenticated: true }, false, "Auth/login");
      },
      logout: () => {
        authStorage.removeToken();
        set({ isAuthenticated: false }, false, "Auth/logout");
      },
    }),
    { name: "Auth Store" }
  )
);
