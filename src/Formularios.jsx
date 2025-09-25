import './Formularios.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Formularios = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    cep: '',
    cidade: '',
    rua: '',
    numero: '',
    complemento: '',
    empresa: '',
    cargo: '',
    renda: '',
    tipoContrato: ''
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    // Aqui você pode processar os dados
  };

  return (
    <div className="formularios-container">
      <button className="back-btn" onClick={handleBack}>← Voltar</button>
      <div className="formularios-card">
        <h1>Formulários</h1>
        <p>Preencha os dados necessários</p>
        
        <form className="formularios-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Dados Pessoais</h3>
            <div className="input-row">
              <input 
                type="text" 
                name="nome"
                placeholder="Nome completo" 
                value={formData.nome}
                onChange={handleInputChange}
                required 
              />
              <input 
                type="text" 
                name="cpf"
                placeholder="CPF" 
                value={formData.cpf}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="input-row">
              <input 
                type="date" 
                name="dataNascimento"
                placeholder="Data de nascimento" 
                value={formData.dataNascimento}
                onChange={handleInputChange}
                required 
              />
              <input 
                type="tel" 
                name="telefone"
                placeholder="Telefone" 
                value={formData.telefone}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Endereço</h3>
            <div className="input-row">
              <input 
                type="text" 
                name="cep"
                placeholder="CEP" 
                value={formData.cep}
                onChange={handleInputChange}
                required 
              />
              <input 
                type="text" 
                name="cidade"
                placeholder="Cidade" 
                value={formData.cidade}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="input-row">
              <input 
                type="text" 
                name="rua"
                placeholder="Rua" 
                value={formData.rua}
                onChange={handleInputChange}
                required 
              />
              <input 
                type="text" 
                name="numero"
                placeholder="Número" 
                value={formData.numero}
                onChange={handleInputChange}
                required 
              />
            </div>
            <input 
              type="text" 
              name="complemento"
              placeholder="Complemento" 
              value={formData.complemento}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-section">
            <h3>Informações Profissionais</h3>
            <div className="input-row">
              <input 
                type="text" 
                name="empresa"
                placeholder="Empresa" 
                value={formData.empresa}
                onChange={handleInputChange}
                required 
              />
              <input 
                type="text" 
                name="cargo"
                placeholder="Cargo" 
                value={formData.cargo}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="input-row">
              <input 
                type="number" 
                name="renda"
                placeholder="Renda mensal" 
                value={formData.renda}
                onChange={handleInputChange}
                required 
              />
              <select 
                name="tipoContrato"
                value={formData.tipoContrato}
                onChange={handleInputChange}
                required
              >
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