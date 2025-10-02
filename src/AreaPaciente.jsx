import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './AreaPaciente.css'

const AreaPaciente = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [scheduledAppointments, setScheduledAppointments] = useState([
    { id: 1, doctor: 'Dr. João Silva', date: '15/01/2025', time: '14:00', status: 'Confirmado' },
    { id: 2, doctor: 'Dra. Maria Santos', date: '18/01/2025', time: '10:00', status: 'Confirmado' },
    { id: 3, doctor: 'Dr. Pedro Costa', date: '22/01/2025', time: '16:30', status: 'Pendente' },
    { id: 4, doctor: 'Dra. Ana Oliveira', date: '25/01/2025', time: '09:00', status: 'Confirmado' },
    { id: 5, doctor: 'Dr. Carlos Lima', date: '28/01/2025', time: '15:00', status: 'Confirmado' }
  ])
  const [appointmentHistory] = useState([
    { id: 1, doctor: 'Dr. Roberto Alves', date: '10/12/2024', time: '14:00', status: 'Realizada', rating: 5 },
    { id: 2, doctor: 'Dra. Fernanda Costa', date: '05/12/2024', time: '10:30', status: 'Realizada', rating: 4 },
    { id: 3, doctor: 'Dr. Marcos Silva', date: '28/11/2024', time: '16:00', status: 'Realizada', rating: 5 },
    { id: 4, doctor: 'Dra. Lucia Santos', date: '20/11/2024', time: '09:00', status: 'Realizada', rating: 4 },
    { id: 5, doctor: 'Dr. Paulo Lima', date: '15/11/2024', time: '15:30', status: 'Realizada', rating: 5 },
    { id: 6, doctor: 'Dra. Carla Mendes', date: '08/11/2024', time: '11:00', status: 'Faltou', rating: null },
    { id: 7, doctor: 'Dr. Eduardo Rocha', date: '02/11/2024', time: '13:30', status: 'Realizada', rating: 3 }
  ])
  const navigate = useNavigate();

  const availableSlots = useMemo(() => {
    const slots = {}
    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']
    
    // Generate slots for current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      const shuffled = [...timeSlots].sort(() => 0.5 - Math.random())
      const randomSlots = shuffled.slice(0, Math.floor(Math.random() * 4) + 3)
      slots[dateStr] = randomSlots.sort()
    }
    return slots
  }, [currentYear, currentMonth])

  const isMonthAllowed = (year, month) => {
    const today = new Date()
    const currentRealMonth = today.getMonth()
    const currentRealYear = today.getFullYear()
    
    // Allow current month and next month only
    if (year === currentRealYear) {
      return month <= currentRealMonth + 1
    }
    if (year === currentRealYear + 1 && currentRealMonth === 11) {
      return month === 0 // Allow January of next year if current month is December
    }
    return false
  }

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const currentDate = new Date(startDate)
    const monthAllowed = isMonthAllowed(currentYear, currentMonth)
    
    for (let i = 0; i < 42; i++) {
      const dateStr = currentDate.toISOString().split('T')[0]
      const isCurrentMonth = currentDate.getMonth() === currentMonth
      const hasSlots = availableSlots[dateStr] && monthAllowed
      const isBlocked = !monthAllowed && isCurrentMonth
      
      days.push(
        <div
          key={dateStr}
          className={`calendar-day ${
            isCurrentMonth ? 'current-month' : 'other-month'
          } ${
            selectedDate === dateStr ? 'selected' : ''
          } ${
            hasSlots ? 'has-slots' : ''
          } ${
            isBlocked ? 'blocked' : ''
          }`}
          onClick={() => {
            if (isCurrentMonth && hasSlots && monthAllowed) {
              console.log('Selected date:', dateStr)
              setSelectedDate(dateStr)
              setSelectedTime(null)
            } else if (isCurrentMonth && !monthAllowed) {
              alert('Agenda não criada: Não é possível agendar com mais de 1 mês de antecedência.')
            }
          }}
        >
          {currentDate.getDate()}
        </div>
      )
      
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return days
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
          <div className="section-content centered">
            <h2>Agendar Consulta</h2>
            <div className="calendar-card centered-card">
              <div className="calendar-nav">
                <button onClick={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11)
                    setCurrentYear(currentYear - 1)
                  } else {
                    setCurrentMonth(currentMonth - 1)
                  }
                  setSelectedDate(null)
                  setSelectedTime(null)
                }}>&lt;</button>
                <h3>{new Date(currentYear, currentMonth).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h3>
                <button 
                  onClick={() => {
                    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
                    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
                    
                    if (isMonthAllowed(nextYear, nextMonth)) {
                      if (currentMonth === 11) {
                        setCurrentMonth(0)
                        setCurrentYear(currentYear + 1)
                      } else {
                        setCurrentMonth(currentMonth + 1)
                      }
                      setSelectedDate(null)
                      setSelectedTime(null)
                    }
                  }}
                  disabled={!isMonthAllowed(
                    currentMonth === 11 ? currentYear + 1 : currentYear,
                    currentMonth === 11 ? 0 : currentMonth + 1
                  )}
                >&gt;</button>
              </div>
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
              <div className="slots-card centered-card">
                <h3>Horários Disponíveis - {selectedDate ? (() => {
                  const [year, month, day] = selectedDate.split('-')
                  return `${day}/${month}/${year}`
                })() : ''}</h3>
                <div className="time-slots">
                  {availableSlots[selectedDate].map(slot => (
                    <button 
                      key={slot} 
                      className={`time-slot ${selectedTime === slot ? 'selected-time' : ''}`} 
                      onClick={() => setSelectedTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {selectedTime && (
                  <button className="agendar-btn" onClick={() => {
                    const [year, month, day] = selectedDate.split('-')
                    const formattedDate = `${day}/${month}/${year}`
                    const newAppointment = {
                      id: scheduledAppointments.length + 1,
                      doctor: 'Dr. Especialista',
                      date: formattedDate,
                      time: selectedTime,
                      status: 'Confirmado'
                    }
                    setScheduledAppointments([...scheduledAppointments, newAppointment])
                    alert(`Consulta confirmada para ${formattedDate} às ${selectedTime}!`)
                    setSelectedDate(null)
                    setSelectedTime(null)
                  }}>
                    Agendar Consulta
                  </button>
                )}
              </div>
            )}
          </div>
        )
      case 'consultas':
        return (
          <div className="section-content">
            <h2>Minhas Consultas</h2>
            <div className="agenda-card">
              <p>Suas consultas agendadas ({scheduledAppointments.length})</p>
              <div className="agenda-list">
                {scheduledAppointments.map(appointment => (
                  <div key={appointment.id} className="agenda-item">
                    <span>{appointment.doctor} - {appointment.date} {appointment.time}</span>
                    <div className="appointment-actions">
                      <span className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</span>
                      <button 
                        className="cancel-btn" 
                        onClick={() => {
                          if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
                            setScheduledAppointments(scheduledAppointments.filter(app => app.id !== appointment.id))
                          }
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'historico':
        return (
          <div className="section-content">
            <h2>Histórico de Consultas</h2>
            <div className="history-card">
              <p>Suas consultas anteriores ({appointmentHistory.length})</p>
              <div className="history-list">
                {appointmentHistory.map(appointment => (
                  <div key={appointment.id} className="history-item">
                    <div className="history-info">
                      <span className="history-doctor">{appointment.doctor}</span>
                      <span className="history-datetime">{appointment.date} - {appointment.time}</span>
                    </div>
                    <div className="history-status">
                      <span className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</span>
                      {appointment.rating && (
                        <div className="rating">
                          {'★'.repeat(appointment.rating)}{'☆'.repeat(5 - appointment.rating)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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