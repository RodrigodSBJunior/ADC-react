import './Formularios.css'

const Formularios = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="formularios-container">
      <button className="back-btn" onClick={handleBack}>← Voltar</button>
      <div className="formularios-card">
        <h1>Formulários</h1>
        <p>Preencha os dados necessários</p>
        
        <form className="formularios-form">
          <div className="form-section">
            <h3>Dados Pessoais</h3>
            <div className="input-row">
              <input type="text" placeholder="Nome completo" required />
              <input type="text" placeholder="CPF" required />
            </div>
            <div className="input-row">
              <input type="date" placeholder="Data de nascimento" required />
              <input type="tel" placeholder="Telefone" required />
            </div>
          </div>

          <div className="form-section">
            <h3>Endereço</h3>
            <div className="input-row">
              <input type="text" placeholder="CEP" required />
              <input type="text" placeholder="Cidade" required />
            </div>
            <div className="input-row">
              <input type="text" placeholder="Rua" required />
              <input type="text" placeholder="Número" required />
            </div>
            <input type="text" placeholder="Complemento" />
          </div>

          <div className="form-section">
            <h3>Informações Profissionais</h3>
            <div className="input-row">
              <input type="text" placeholder="Empresa" required />
              <input type="text" placeholder="Cargo" required />
            </div>
            <div className="input-row">
              <input type="number" placeholder="Renda mensal" required />
              <select required>
                <option value="">Tipo de contrato</option>
                <option value="clt">CLT</option>
                <option value="pj">PJ</option>
                <option value="autonomo">Autônomo</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">Enviar Formulário</button>
        </form>
      </div>
    </div>
  )
}

export default Formularios