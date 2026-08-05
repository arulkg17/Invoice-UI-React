// src/utils/tokenStorage.ts
const TOKEN_KEY = "token";
const EXP_KEY = "token_exp";

export const saveToken = (token: string, expiration?: string) => {
  localStorage.setItem(TOKEN_KEY, token);

  if (expiration) {
    localStorage.setItem(EXP_KEY, expiration);
  }
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getExpiration = () => {
  return localStorage.getItem(EXP_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);

  localStorage.removeItem(EXP_KEY);
};

export const isLoggedIn = () => {
  return !!getToken();
};
