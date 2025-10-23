import { useNavigate } from 'react-router-dom'

const SidebarPaciente = ({ activeSection, setActiveSection, notifications }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="sidebar-fixed">
      <div className="sidebar-header">
        <h2>ADC Paciente</h2>
      </div>
      
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveSection('dashboard')}
        >
          <span className="nav-label">Dashboard</span>
        </button>
        
        <button
          className={`nav-item ${activeSection === 'agendar' ? 'active' : ''}`}
          onClick={() => setActiveSection('agendar')}
        >
          <span className="nav-label">Agendar Consulta</span>
        </button>
        
        <button
          className={`nav-item ${activeSection === 'consultas' ? 'active' : ''}`}
          onClick={() => setActiveSection('consultas')}
        >
          <span className="nav-label">Minhas Consultas</span>
          <span className="notification-badge">3</span>
        </button>
        
        <button
          className={`nav-item ${activeSection === 'historico' ? 'active' : ''}`}
          onClick={() => setActiveSection('historico')}
        >
          <span className="nav-label">Histórico</span>
        </button>
        
        <button
          className={`nav-item ${activeSection === 'perfil' ? 'active' : ''}`}
          onClick={() => setActiveSection('perfil')}
        >
          <span className="nav-label">Meu Perfil</span>
        </button>
      </nav>
      
      <div className="sidebar-footer">
        <button
          className={`nav-item ${activeSection === 'notificacoes' ? 'active' : ''}`}
          onClick={() => setActiveSection('notificacoes')}
        >
          <span className="nav-label">Notificações</span>
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </button>
        
        <button className="nav-item logout" onClick={handleLogout}>
          <span className="nav-label">Sair</span>
        </button>
      </div>
    </div>
  )
}

export default SidebarPaciente