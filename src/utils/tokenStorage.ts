const TOKEN_KEY = "token";
const EXP_KEY = "token_exp";
const USER_KEY = "user";

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

export const saveUser = (user: unknown) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = <T>() => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as T;
  } catch {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXP_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isLoggedIn = () => {
  return !!getToken();
};
