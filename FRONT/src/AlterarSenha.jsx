import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AlterarSenha.css'

const AlterarSenha = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }
    
    if (newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres')
      return
    }
    
    // Simular alteração de senha
    alert('Senha alterada com sucesso!')
    navigate(-1)
  }

  return (
    <div className="alterar-senha-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Voltar
      </button>
      
      <div className="alterar-senha-card">
        <h1>Alterar Senha</h1>
        <p>Digite sua senha atual e a nova senha</p>
        
        <form onSubmit={handleSubmit} className="senha-form">
          <div className="input-group">
            <input
              type="password"
              placeholder="Senha atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirmar nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="alterar-btn">
            Alterar Senha
          </button>
        </form>
      </div>
    </div>
  )
}

export default AlterarSenha