import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AreaPaciente.css'

const AreaPaciente = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [selectedDate, setSelectedDate] = useState(null)
  const navigate = useNavigate();

  const availableSlots = {
    '2024-01-15': ['09:00', '10:30', '14:00', '15:30'],
    '2024-01-16': ['08:00', '09:30', '11:00', '16:00'],
    '2024-01-17': ['10:00', '13:30', '15:00'],
    '2024-01-18': ['09:00', '11:30', '14:30', '16:30'],
    '2024-01-19': ['08:30', '10:00', '13:00', '15:00']
  };

  const generateCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasSlots = availableSlots[dateStr];
      const isToday = day === today.getDate();
      const isPast = day < today.getDate();
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${hasSlots ? 'available' : ''} ${isToday ? 'today' : ''} ${isPast ? 'past' : ''} ${selectedDate === dateStr ? 'selected' : ''}`}
          onClick={() => hasSlots && !isPast ? setSelectedDate(dateStr) : null}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };



  const handleLogout = () => {
    navigate('/')
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'agendar', label: 'Agendar Consulta' },
    { id: 'consultas', label: 'Minhas Consultas' },
    { id: 'historico', label: 'Histórico' },
    { id: 'perfil', label: 'Meu Perfil' }
  ]

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="modern-dashboard">
            <div className="stats-grid">
              <div className="stat-card blue">
                <div className="stat-info">
                  <div className="stat-number">12</div>
                  <div className="stat-label">Consultas Este Mês</div>
                </div>
              </div>
              <div className="stat-card green">
                <div className="stat-info">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Próximas Consultas</div>
                </div>
              </div>
              <div className="stat-card purple">
                <div className="stat-info">
                  <div className="stat-number">95%</div>
                  <div className="stat-label">Taxa de Comparecimento</div>
                </div>
              </div>
              <div className="stat-card orange">
                <div className="stat-info">
                  <div className="stat-number">8.5</div>
                  <div className="stat-label">Avaliação Média</div>
                </div>
              </div>
            </div>

            <div className="chart-container">
              <div className="chart-card">
                <h3>Presenças vs Faltas</h3>
                <div className="wave-chart">
                  <div className="month-row">
                    <div className="month-label">Jan</div>
                    <div className="wave-container">
                      <div className="wave-bar present" style={{width: '80%'}} data-tooltip="8 presenças">
                        <div className="wave-fill"></div>
                        <span className="wave-value">8</span>
                      </div>
                      <div className="wave-bar absent" style={{width: '20%'}} data-tooltip="2 faltas">
                        <div className="wave-fill"></div>
                        <span className="wave-value">2</span>
                      </div>
                    </div>
                  </div>
                  <div className="month-row">
                    <div className="month-label">Fev</div>
                    <div className="wave-container">
                      <div className="wave-bar present" style={{width: '90%'}} data-tooltip="9 presenças">
                        <div className="wave-fill"></div>
                        <span className="wave-value">9</span>
                      </div>
                      <div className="wave-bar absent" style={{width: '10%'}} data-tooltip="1 falta">
                        <div className="wave-fill"></div>
                        <span className="wave-value">1</span>
                      </div>
                    </div>
                  </div>
                  <div className="month-row">
                    <div className="month-label">Mar</div>
                    <div className="wave-container">
                      <div className="wave-bar present" style={{width: '70%'}} data-tooltip="7 presenças">
                        <div className="wave-fill"></div>
                        <span className="wave-value">7</span>
                      </div>
                      <div className="wave-bar absent" style={{width: '30%'}} data-tooltip="3 faltas">
                        <div className="wave-fill"></div>
                        <span className="wave-value">3</span>
                      </div>
                    </div>
                  </div>
                  <div className="month-row">
                    <div className="month-label">Abr</div>
                    <div className="wave-container">
                      <div className="wave-bar present" style={{width: '100%'}} data-tooltip="10 presenças">
                        <div className="wave-fill"></div>
                        <span className="wave-value">10</span>
                      </div>
                      <div className="wave-bar absent" style={{width: '0%'}} data-tooltip="0 faltas">
                        <div className="wave-fill"></div>
                        <span className="wave-value">0</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-dot present"></div>
                    <span>Presenças</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot absent"></div>
                    <span>Faltas</span>
                  </div>
                </div>
              </div>
            </div>


          </div>
        )
      case 'agendar':
        return (
          <div className="section-content">
            <h2>Agendar Consulta</h2>
            <div className="calendar-container">
              <div className="calendar-card">
                <h3>Selecione uma Data</h3>
                <div className="calendar-header">
                  <span>Dom</span>
                  <span>Seg</span>
                  <span>Ter</span>
                  <span>Qua</span>
                  <span>Qui</span>
                  <span>Sex</span>
                  <span>Sáb</span>
                </div>
                <div className="calendar-grid">
                  {generateCalendar()}
                </div>
              </div>
              
              {selectedDate && availableSlots[selectedDate] && (
                <div className="slots-card">
                  <h3>Horários Disponíveis - {new Date(selectedDate).toLocaleDateString('pt-BR')}</h3>
                  <div className="time-slots">
                    {availableSlots[selectedDate].map(slot => (
                      <button key={slot} className="time-slot" onClick={() => alert(`Consulta agendada para ${slot}`)}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      case 'consultas':
        return (
          <div className="section-content">
            <h2>Minhas Consultas</h2>
            <div className="agenda-card">
              <p>Suas próximas consultas</p>
              <div className="agenda-list">
                <div className="agenda-item">
                  <span>Dr. João Silva - 15/01 14:00</span>
                  <span className="status confirmado">Confirmado</span>
                </div>
              </div>
            </div>
          </div>
        )
      case 'historico':
        return (
          <div className="section-content">
            <h2>Histórico</h2>
            <div className="history-card">
              <p>Suas consultas anteriores</p>
              <button className="secondary-btn">Ver Histórico Completo</button>
            </div>
          </div>
        )
      case 'perfil':
        return (
          <div className="section-content">
            <h2>Meu Perfil</h2>
            <div className="profile-card">
              <p>Suas informações pessoais</p>
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
          <h2>ADC Paciente</h2>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={handleLogout}>
            <span className="nav-label">Sair</span>
          </button>
        </div>
      </div>
      <div className="main-content">
        <header className="top-header">
          <h1>Bem-vindo ao Dashboard</h1>
        </header>
        
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default AreaPaciente