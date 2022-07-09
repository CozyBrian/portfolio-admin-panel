export type authContext = {
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  onLogin: (email: string, password: string) => void;
};
