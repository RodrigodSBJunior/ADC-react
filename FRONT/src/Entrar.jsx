import { useState } from 'react'
import './Entrar.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/shared image.png';
import pacienteImg from './assets/paciente.png';
import pacienteHoverImg from './assets/paciente (1).png';
import psicologiaImg from './assets/psicologia.png';
import psicologiaSelectedImg from './assets/psicologia (1).png';
import ApiService from './services/api';

const Entrar = () => {
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  const handleCreateAccount = () => {
    navigate('/cadastro');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await ApiService.login(email, senha);
      const usuario = response.usuario;
      
      // Verificar se o tipo de usuário corresponde ao selecionado
      if (usuario.tipoUsuario.toLowerCase() !== userType) {
        throw new Error('Tipo de usuário não corresponde ao selecionado');
      }
      
      // Salvar dados do usuário no localStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));
      
      // Redirecionar baseado no tipo de usuário
      if (userType === 'profissional') {
        navigate('/areaprofissional');
      } else {
        navigate('/areapaciente');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <button className="back-btn" onClick={handleBack}>
        ← Voltar
      </button>
      <div className="content-wrapper">
        <div className="logo-section">
          <img src={logo} alt="ADC Psicologia" />
        </div>
        <div className="login-card">
        <h1>Faça seu Login</h1>
        <br />
        <div className="user-type-selection">
          <h3>Selecione o tipo de usuário</h3>
          <div className="user-cards">
            <div
              className={`user-card ${
                userType === "paciente" ? "selected" : ""
              }`}
              onClick={() => setUserType("paciente")}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('.card-image');
                if (img) img.src = pacienteHoverImg;
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('.card-image');
                if (img) img.src = pacienteImg;
              }}
            >
              <img src={pacienteImg} alt="Paciente" className="card-image" />
              <h4>Paciente</h4>
            </div>
            <div
              className={`user-card ${
                userType === "profissional" ? "selected" : ""
              }`}
              onClick={() => setUserType("profissional")}
            >
              <img src={userType === "profissional" ? psicologiaSelectedImg : psicologiaImg} alt="Profissional" className="card-image" />
              <h4>Profissional</h4>
            </div>
          </div>
        </div>

        {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Senha" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required 
            />
            <button 
              type="button" 
              className="forgot-password"
              onClick={() => alert('Funcionalidade em desenvolvimento')}
            >
              Esqueci a senha
            </button>
          </div>
          <button 
            type="submit" 
            className="login-btn"
            disabled={!userType || loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          <button
            type="button"
            className="create-account-btn"
            onClick={handleCreateAccount}
          >
            Criar conta
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Entrar