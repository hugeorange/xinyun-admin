const TOKEN_KEY = "accessToken";
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (value: string) => {
  localStorage.setItem(TOKEN_KEY, value);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
