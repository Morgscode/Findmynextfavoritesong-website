import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
};

type LoginAction = { type: "LOGIN" };
type LogoutAction = { type: "LOGOUT" };
type SetTokenAction = { type: "SET_TOKEN"; payload: string };

type AuthAction = LoginAction | LogoutAction | SetTokenAction;

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
};

type AuthContextProps = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: new URLSearchParams(action.payload).get("#access_token"),
      };
    default:
      return state;
  }
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
