import React, { useContext, createContext, useState, ReactNode } from 'react';
import { api } from '../service/api';

interface User {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

//criando contexto do tipo AuthContextData.
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

//funcao que ira prover o contexto para varias paginas.
function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({token, user});
  }

  //retornamos dentro no provider aquilo que queremos usar.
  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// função que usara tal contexto
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
