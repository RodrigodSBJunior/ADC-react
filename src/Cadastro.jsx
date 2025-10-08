import './Cadastro.css'
import Calendar from './Calendar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './assets/shared image.png'
import pacienteImg from './assets/paciente.png'
import pacienteHoverImg from './assets/paciente (1).png'
import psicologiaImg from './assets/psicologia.png'
import psicologiaSelectedImg from './assets/psicologia (1).png'

const Cadastro = () => {
  const [userType, setUserType] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [ageError, setAgeError] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogin = () => {
    navigate('/entrar');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === 'profissional') {
      navigate('/areaprofissional');
    } else {
      navigate('/areapaciente');
    }
  };

  const validateAge = (date) => {
    const today = new Date()
    const birthDateObj = new Date(date)
    const age = today.getFullYear() - birthDateObj.getFullYear()
    const monthDiff = today.getMonth() - birthDateObj.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      return age - 1
    }
    return age
  }

  const validateAndSetAge = (date) => {
    const age = validateAge(date)
    if (age < 12) {
      setAgeError('Você deve ter pelo menos 12 anos para se cadastrar')
    } else {
      setAgeError('')
    }
  }

  const handleDateChange = (e) => {
    const date = e.target.value
    setBirthDate(date)
    
    if (date) {
      validateAndSetAge(date)
    }
  }

  const handleDateSelect = (date) => {
    setBirthDate(date)
    validateAndSetAge(date)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    const emailValue = e.target.value
    setEmail(emailValue)
    
    if (emailValue && !validateEmail(emailValue)) {
      setEmailError('Email inválido')
    } else if (confirmEmail && emailValue !== confirmEmail) {
      setEmailError('Emails não coincidem')
    } else {
      setEmailError('')
    }
  }

  const handleConfirmEmailChange = (e) => {
    const confirmEmailValue = e.target.value
    setConfirmEmail(confirmEmailValue)
    
    if (email && confirmEmailValue !== email) {
      setEmailError('Emails não coincidem')
    } else {
      setEmailError('')
    }
  }

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value
    setPassword(passwordValue)
    
    if (confirmPassword && passwordValue !== confirmPassword) {
      setPasswordError('Senhas não coincidem')
    } else {
      setPasswordError('')
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value
    setConfirmPassword(confirmPasswordValue)
    
    if (password && confirmPasswordValue !== password) {
      setPasswordError('Senhas não coincidem')
    } else {
      setPasswordError('')
    }
  }

  return (
    <div className="cadastro-container">
      <button className="back-btn" onClick={handleBack}>← Voltar</button>
      <div className="content-wrapper">
        <div className="logo-section">
          <img src={logo} alt="ADC Psicologia" />
        </div>
        <div className="cadastro-card">
        <h1>Criar Conta</h1>
        <p>Preencha os dados para se cadastrar</p>
        
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
        
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" placeholder="Nome completo" required />
          </div>
          
          <div className="input-row">
            <div className="input-group">
              <input type="text" placeholder="CPF" required />
            </div>
            <div className="input-group">
              <input type="tel" placeholder="Telefone" required />
            </div>
          </div>
          
          <div className="input-row">
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={handleEmailChange}
                className={emailError ? 'error' : ''}
                required 
              />
            </div>
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Confirmar email" 
                value={confirmEmail}
                onChange={handleConfirmEmailChange}
                className={emailError ? 'error' : ''}
                required 
              />
            </div>
          </div>
          {emailError && <div className="error-message">{emailError}</div>}
          
          <div className="input-row">
            <div className="input-group">
              <input 
                type="date" 
                value={birthDate}
                onChange={handleDateChange}
                className={ageError ? 'error' : ''}
                required 
              />
              {ageError && <div className="error-message">{ageError}</div>}
            </div>
            <div className="input-group">
              <select required>
                <option value="">Sexo</option>
                <option value="M">M</option>
                <option value="F">F</option>
                <option value="O">O</option>
              </select>
            </div>
          </div>
          
          <div className="input-row">
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Senha" 
                value={password}
                onChange={handlePasswordChange}
                className={passwordError ? 'error' : ''}
                required 
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Confirmar senha" 
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={passwordError ? 'error' : ''}
                required 
              />
            </div>
          </div>
          {passwordError && <div className="error-message">{passwordError}</div>}
          
          <div className="terms-checkbox">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              <span className="checkmark">{acceptTerms ? '✓' : ''}</span>
              Li e concordo com os <a href="/termos-de-uso" target="_blank" className="terms-link">termos de uso</a>
            </label>
          </div>
          
          <button type="submit" className="cadastro-btn" disabled={!acceptTerms || !userType}>Criar Conta</button>
          <button type="button" className="login-link-btn" onClick={handleLogin}>Já tenho conta</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Cadastro