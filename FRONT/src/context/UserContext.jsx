import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      try {
        setUsuario(JSON.parse(usuarioSalvo));
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error);
        localStorage.removeItem('usuario');
      }
    }
    setLoading(false);
  }, []);

  const login = (dadosUsuario) => {
    setUsuario(dadosUsuario);
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  const atualizarUsuario = (dadosAtualizados) => {
    const usuarioAtualizado = { ...usuario, ...dadosAtualizados };
    setUsuario(usuarioAtualizado);
    localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
  };

  const value = {
    usuario,
    login,
    logout,
    atualizarUsuario,
    isLoggedIn: !!usuario,
    loading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};