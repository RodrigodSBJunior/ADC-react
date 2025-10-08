import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './AreaPaciente.css'
import SidebarPaciente from './SidebarPaciente'

const AreaPaciente = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState('Maria Silva Santos')
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [editedEmail, setEditedEmail] = useState('maria.silva@email.com')
  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [editedPhone, setEditedPhone] = useState('(11) 99999-9999')
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
  const [notifications, setNotifications] = useState([
    { id: 1, icon: '🔔', title: 'Nova consulta agendada', message: 'Sua consulta com Dr. João foi confirmada para 15/01 às 14:00', time: 'Há 2 horas', read: false },
    { id: 2, icon: 'ℹ️', title: 'Lembrete de consulta', message: 'Sua consulta é amanhã às 10:00. Não esqueça!', time: 'Há 5 horas', read: false },
    { id: 3, icon: '✅', title: 'Consulta realizada', message: 'Consulta com Dra. Maria foi concluída. Avalie o atendimento', time: 'Ontem', read: true },
    { id: 4, icon: '📝', title: 'Relatório disponível', message: 'Seu relatório médico já está disponível para download', time: 'Há 1 dia', read: false },
    { id: 5, icon: '💳', title: 'Pagamento processado', message: 'Pagamento da consulta de 10/01 foi processado com sucesso', time: 'Há 2 dias', read: false }
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





  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-wrapper">
            <div className="dashboard-header">
              <h2>Visão Geral</h2>
            </div>
            
            <div className="dashboard-stats">
              <div className="stat-card-new blue">
                <div className="stat-content">
                  <div className="stat-number">12</div>
                  <div className="stat-label">Consultas Este Mês</div>
                </div>
              </div>
              
              <div className="stat-card-new green">
                <div className="stat-content">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Próximas Consultas</div>
                </div>
              </div>
              
              <div className="stat-card-new purple">
                <div className="stat-content">
                  <div className="stat-number">95%</div>
                  <div className="stat-label">Taxa de Comparecimento</div>
                </div>
              </div>
              
              <div className="stat-card-new orange">
                <div className="stat-content">
                  <div className="stat-number">4.8</div>
                  <div className="stat-label">Avaliação Média</div>
                </div>
              </div>
            </div>
            
            <div className="dashboard-content">
              <div className="dashboard-card">
                <h3>Próximas Consultas</h3>
                <div className="upcoming-appointments">
                  <div className="appointment-item">
                    <div className="appointment-date">
                      <span className="day">15</span>
                      <span className="month">Jan</span>
                    </div>
                    <div className="appointment-info">
                      <h4>Dr. João Silva</h4>
                      <p>14:00 - Consulta de Rotina</p>
                    </div>
                    <div className="appointment-status confirmed">Confirmado</div>
                  </div>
                  
                  <div className="appointment-item">
                    <div className="appointment-date">
                      <span className="day">18</span>
                      <span className="month">Jan</span>
                    </div>
                    <div className="appointment-info">
                      <h4>Dra. Maria Santos</h4>
                      <p>10:00 - Acompanhamento</p>
                    </div>
                    <div className="appointment-status confirmed">Confirmado</div>
                  </div>
                  
                  <div className="appointment-item">
                    <div className="appointment-date">
                      <span className="day">22</span>
                      <span className="month">Jan</span>
                    </div>
                    <div className="appointment-info">
                      <h4>Dr. Pedro Costa</h4>
                      <p>16:30 - Consulta Especializada</p>
                    </div>
                    <div className="appointment-status pending">Pendente</div>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-card">
                <h3>Resumo Mensal</h3>
                <div className="monthly-summary">
                  <div className="summary-item">
                    <div className="summary-icon green">✓</div>
                    <div className="summary-text">
                      <span className="summary-number">8</span>
                      <span className="summary-label">Consultas Realizadas</span>
                    </div>
                  </div>
                  
                  <div className="summary-item">
                    <div className="summary-icon red">✗</div>
                    <div className="summary-text">
                      <span className="summary-number">1</span>
                      <span className="summary-label">Faltas</span>
                    </div>
                  </div>
                  
                  <div className="summary-item">
                    <div className="summary-icon blue">💰</div>
                    <div className="summary-text">
                      <span className="summary-number">R$ 800</span>
                      <span className="summary-label">Valor Total</span>
                    </div>
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
                        onClick={() => navigate('/cancelar')}
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
      case 'notificacoes':
        return (
          <div className="section-content">
            <h2>Notificações</h2>
            <div className="notifications-card">
              {notifications.length > 0 ? (
                <>
                  <div className="notifications-list">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${!notification.read ? 'unread' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="notification-icon">{notification.icon}</div>
                        <div className="notification-content">
                          <h4>{notification.title}</h4>
                          <p>{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                        {!notification.read && <div className="unread-dot"></div>}
                      </div>
                    ))}
                  </div>
                  <div className="notification-actions">
                    <button 
                      className="primary-btn" 
                      onClick={markAllAsRead}
                      disabled={unreadCount === 0}
                    >
                      Marcar todas como lidas
                    </button>
                    <button 
                      className="secondary-btn" 
                      onClick={() => {
                        if (confirm('Tem certeza que deseja limpar todas as notificações?')) {
                          clearNotifications()
                        }
                      }}
                    >
                      Limpar notificações
                    </button>
                  </div>
                </>
              ) : (
                <div className="empty-notifications">
                  <div className="empty-icon">🔔</div>
                  <h3>Nenhuma notificação</h3>
                  <p>Você não tem notificações no momento.</p>
                </div>
              )}
            </div>
          </div>
        )
      case 'perfil':
        return (
          <div className="section-content">
            <h2>Meu Perfil</h2>
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  <div className="avatar-circle">👤</div>
                  <button className="change-photo-btn">Alterar Foto</button>
                </div>
                <div className="profile-info">
                  <h3>Maria Silva</h3>
                  <p className="profile-type">Paciente</p>
                  <p className="member-since">Membro desde: Janeiro 2024</p>
                </div>
              </div>
              
              <div className="profile-details">
                <div className="detail-section">
                  <h4>Informações Pessoais</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Nome Completo</label>
                      {isEditingName ? (
                        <div className="edit-field">
                          <input 
                            type="text" 
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="edit-input"
                          />
                          <div className="edit-actions">
                            <button 
                              className="save-btn"
                              onClick={() => setIsEditingName(false)}
                            >
                              ✓
                            </button>
                            <button 
                              className="cancel-btn"
                              onClick={() => {
                                setEditedName('Maria Silva Santos')
                                setIsEditingName(false)
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="view-field">
                          <span>{editedName}</span>
                          <button 
                            className="edit-btn"
                            onClick={() => setIsEditingName(true)}
                          >
                            ✏️
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="detail-item">
                      <label>Email</label>
                      {isEditingEmail ? (
                        <div className="edit-field">
                          <input 
                            type="email" 
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            className="edit-input"
                          />
                          <div className="edit-actions">
                            <button 
                              className="save-btn"
                              onClick={() => setIsEditingEmail(false)}
                            >
                              ✓
                            </button>
                            <button 
                              className="cancel-btn"
                              onClick={() => {
                                setEditedEmail('maria.silva@email.com')
                                setIsEditingEmail(false)
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="view-field">
                          <span>{editedEmail}</span>
                          <button 
                            className="edit-btn"
                            onClick={() => setIsEditingEmail(true)}
                          >
                            ✏️
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="detail-item">
                      <label>CPF</label>
                      <span>123.456.789-00</span>
                    </div>
                    <div className="detail-item">
                      <label>Telefone</label>
                      {isEditingPhone ? (
                        <div className="edit-field">
                          <input 
                            type="tel" 
                            value={editedPhone}
                            onChange={(e) => setEditedPhone(e.target.value)}
                            className="edit-input"
                          />
                          <div className="edit-actions">
                            <button 
                              className="save-btn"
                              onClick={() => setIsEditingPhone(false)}
                            >
                              ✓
                            </button>
                            <button 
                              className="cancel-btn"
                              onClick={() => {
                                setEditedPhone('(11) 99999-9999')
                                setIsEditingPhone(false)
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="view-field">
                          <span>{editedPhone}</span>
                          <button 
                            className="edit-btn"
                            onClick={() => setIsEditingPhone(true)}
                          >
                            ✏️
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="detail-item">
                      <label>Data de Nascimento</label>
                      <span>15/03/1990</span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Complementos</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>CEP</label>
                      <span>01234-567</span>
                    </div>
                    <div className="detail-item">
                      <label>Endereço</label>
                      <span>Rua das Flores, 123</span>
                    </div>
                    <div className="detail-item">
                      <label>Bairro</label>
                      <span>Centro</span>
                    </div>
                    <div className="detail-item">
                      <label>Cidade</label>
                      <span>São Paulo</span>
                    </div>
                    <div className="detail-item">
                      <label>Estado</label>
                      <span>SP</span>
                    </div>
                    <div className="detail-item">
                      <label>Complemento</label>
                      <span>Apto 45</span>
                    </div>
                  </div>
                </div>

              </div>
              
              <div className="profile-actions">
                <button className="secondary-btn" onClick={() => navigate('/alterar-senha')}>Alterar Senha</button>
              </div>
            </div>
          </div>
        )
      default:
        return <div>Seção não encontrada</div>
    }
  }

  return (
    <div className="area-profissional">
      <SidebarPaciente 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        notifications={notifications} 
      />
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