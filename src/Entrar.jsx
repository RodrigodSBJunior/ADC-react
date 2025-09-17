import './Entrar.css'

const Entrar = () => {
  const handleBack = () => {
    window.history.back();
  };

  const handleCreateAccount = () => {
    window.location.href = '/cadastro';
  };

  return (
    <div className="login-container">
      <button className="back-btn" onClick={handleBack}>← Voltar</button>
      <div className="login-card">
        <h1>Bem-vindo</h1>
        <p>Faça login em sua conta</p>
        <form className="login-form">
          <div className="input-group">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Senha" required />
            <a href="#" className="forgot-password">Esqueci a senha</a>
          </div>
          <button type="submit" className="login-btn">Entrar</button>
          <button type="button" className="create-account-btn" onClick={handleCreateAccount}>Criar conta</button>
        </form>
      </div>
    </div>
  )
}

export default Entrar