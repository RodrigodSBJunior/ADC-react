import { useState } from 'react'
import './AreaProfissional.css'
import { useNavigate } from 'react-router-dom'

const AreaProfissional = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [notifications] = useState(3)
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/')
  }

  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'criar-agenda', icon: '📅', label: 'Criar Agenda' },
    { id: 'visualizar-agenda', icon: '📋', label: 'Visualizar Agenda' },
    { id: 'consultas-passadas', icon: '📄', label: 'Consultas Passadas' },
    { id: 'cancelar-consultas', icon: '❌', label: 'Cancelar Consultas' },
    { id: 'pacientes', icon: '👥', label: 'Ver Pacientes' }
  ]

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <div className="cards-grid">
              <div className="feature-card" onClick={() => setActiveSection('criar-agenda')}>
                <div className="card-icon">📅</div>
                <h3>Criar Agenda</h3>
                <p>Defina seus horários disponíveis</p>
              </div>
              
              <div className="feature-card" onClick={() => setActiveSection('visualizar-agenda')}>
                <div className="card-icon">📋</div>
                <h3>Visualizar Agenda</h3>
                <p>Veja seus agendamentos</p>
              </div>
              
              <div className="feature-card" onClick={() => setActiveSection('consultas-passadas')}>
                <div className="card-icon">📄</div>
                <h3>Consultas Passadas</h3>
                <p>Histórico de atendimentos</p>
              </div>
              
              <div className="feature-card" onClick={() => setActiveSection('cancelar-consultas')}>
                <div className="card-icon">❌</div>
                <h3>Cancelar Consultas</h3>
                <p>Gerencie cancelamentos</p>
              </div>
              
              <div className="feature-card" onClick={() => setActiveSection('pacientes')}>
                <div className="card-icon">👥</div>
                <h3>Ver Pacientes</h3>
                <p>Lista de todos os pacientes</p>
              </div>
            </div>
          </div>
        )
      case 'criar-agenda':
        return (
          <div className="section-content">
            <h2>📅 Criar Agenda</h2>
            <div className="form-card">
              <p>Defina seus horários de atendimento</p>
              <button className="primary-btn">Configurar Horários</button>
            </div>
          </div>
        )
      case 'visualizar-agenda':
        return (
          <div className="section-content">
            <h2>📋 Visualizar Agenda</h2>
            <div className="agenda-card">
              <p>Seus próximos agendamentos</p>
              <div className="agenda-list">
                <div className="agenda-item">
                  <span>Maria Silva - 15/01 09:00</span>
                  <span className="status confirmado">Confirmado</span>
                </div>
                <div className="agenda-item">
                  <span>João Santos - 15/01 10:30</span>
                  <span className="status pendente">Pendente</span>
                </div>
              </div>
            </div>
          </div>
        )
      case 'consultas-passadas':
        return (
          <div className="section-content">
            <h2>📄 Consultas Passadas</h2>
            <div className="history-card">
              <p>Histórico de atendimentos realizados</p>
              <button className="secondary-btn">Ver Histórico Completo</button>
            </div>
          </div>
        )
      case 'cancelar-consultas':
        return (
          <div className="section-content">
            <h2>❌ Cancelar Consultas</h2>
            <div className="cancel-card">
              <p>Gerencie cancelamentos de consultas</p>
              <button className="danger-btn">Cancelar Consulta</button>
            </div>
          </div>
        )
      case 'pacientes':
        return (
          <div className="section-content">
            <h2>👥 Ver Pacientes</h2>
            <div className="patients-card">
              <p>Lista de todos os seus pacientes</p>
              <div className="patients-list">
                <div className="patient-item">
                  <div className="patient-avatar">👤</div>
                  <span>Maria Silva</span>
                </div>
                <div className="patient-item">
                  <div className="patient-avatar">👤</div>
                  <span>João Santos</span>
                </div>
              </div>
            </div>
          </div>
        )
      case 'notificacoes':
        return (
          <div className="section-content">
            <h2>🔔 Notificações</h2>
            <div className="notifications-card">
              <p>Suas notificações recentes</p>
              <div className="notification-item">
                <span>Nova consulta agendada - Maria Silva</span>
              </div>
            </div>
          </div>
        )
      case 'perfil':
        return (
          <div className="section-content">
            <h2>👤 Meu Perfil</h2>
            <div className="profile-card">
              <p>Informações do seu perfil</p>
              <button className="secondary-btn">Editar Perfil</button>
            </div>
          </div>
        )
      default:
        return <div>Seção não encontrada</div>
    }
  }

  return (
    <div className="area-profissional">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>👨⚕️ ADC Pro</h2>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button className="nav-item" onClick={() => setActiveSection('notificacoes')}>
            <span className="nav-icon">🔔</span>
            <span className="nav-label">Notificações</span>
            {notifications > 0 && <span className="notification-badge">{notifications}</span>}
          </button>
          
          <button className="nav-item" onClick={() => setActiveSection('perfil')}>
            <span className="nav-icon">👤</span>
            <span className="nav-label">Meu Perfil</span>
          </button>
          
          <button className="nav-item logout" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Sair</span>
          </button>
        </div>
      </div>
      
      <div className="main-content">
        <header className="top-header">
          <h1>Bem-vindo, Dr. Psicólogo</h1>
        </header>
        
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default AreaProfissional