import { useState } from 'react'
import './Entrar.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/shared image.png';
import pacienteImg from './assets/paciente.png';
import pacienteHoverImg from './assets/paciente (1).png';
import psicologiaImg from './assets/psicologia.png';
import psicologiaSelectedImg from './assets/psicologia (1).png';

const Entrar = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  const handleCreateAccount = () => {
    navigate('/cadastro');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (userType === 'profissional') {
      navigate('/areaprofissional');
    } else {
      navigate('/areapaciente');
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

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Senha" required />
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
            disabled={!userType}
          >
            Entrar
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