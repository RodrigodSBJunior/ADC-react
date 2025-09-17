import './Cadastro.css'

const Cadastro = () => {
  const handleBack = () => {
    window.history.back();
  };

  const handleLogin = () => {
    window.location.href = '/entrar';
  };

  return (
    <div className="cadastro-container">
      <button className="back-btn" onClick={handleBack}>← Voltar</button>
      <div className="cadastro-card">
        <h1>Criar Conta</h1>
        <p>Preencha os dados para se cadastrar</p>
        <form className="cadastro-form">
          <div className="input-group">
            <input type="text" placeholder="Nome completo" required />
          </div>
          
          <div className="input-row">
            <div className="input-group">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Confirmar email" required />
            </div>
          </div>
          
          <div className="input-row">
            <div className="input-group">
              <input type="date" required />
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
              <input type="password" placeholder="Senha" required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Confirmar senha" required />
            </div>
          </div>
          
          <button type="submit" className="cadastro-btn">Criar Conta</button>
          <button type="button" className="login-link-btn" onClick={handleLogin}>Já tenho conta</button>
        </form>
      </div>
    </div>
  )
}

export default Cadastro