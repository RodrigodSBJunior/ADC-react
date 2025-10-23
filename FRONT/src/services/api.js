const API_BASE_URL = 'http://localhost:8081/api/v1';

class ApiService {
  async cadastrarUsuario(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar usuário');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  async login(email, senha) {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  async buscarUsuario(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar usuário');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  async atualizarUsuario(id, userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar usuário');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  async atualizarPerfil(id, dadosPerfil) {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosPerfil),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar perfil');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ApiService();