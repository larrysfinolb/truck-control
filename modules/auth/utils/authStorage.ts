const KEY = "access_token";

export const authStorage = {
  getToken: (): string | null => {
    return localStorage.getItem(KEY);
  },
  setToken: (token: string): void => {
    localStorage.setItem(KEY, token);
  },
  removeToken: (): void => {
    localStorage.removeItem(KEY);
  },
};
