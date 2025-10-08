import { useState, useMemo, useEffect } from 'react'
import './AreaProfissional.css'
import { useNavigate } from 'react-router-dom'

const AreaProfissional = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTimes, setSelectedTimes] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [agenda, setAgenda] = useState({})
  const [viewDate, setViewDate] = useState(new Date().toISOString().split('T')[0])
  const [consultas] = useState([
    { id: 1, date: '2025-01-15', time: '09:00', patient: 'Ana Silva', status: 'Confirmado' },
    { id: 2, date: '2025-01-15', time: '10:00', patient: 'Carlos Santos', status: 'Confirmado' },
    { id: 3, date: '2025-01-15', time: '14:00', patient: 'Maria Oliveira', status: 'Pendente' },
    { id: 4, date: '2025-01-16', time: '09:00', patient: 'João Pereira', status: 'Confirmado' },
    { id: 5, date: '2025-01-17', time: '15:00', patient: 'Fernanda Costa', status: 'Confirmado' },
    { id: 6, date: '2025-01-20', time: '11:00', patient: 'Pedro Silva', status: 'Pendente' }
  ])
  const [consultasPassadas] = useState([
    { id: 1, date: '2024-12-20', time: '09:00', patient: 'Roberto Alves', status: 'Realizada', observacoes: 'Sessão produtiva, paciente demonstrou progresso' },
    { id: 2, date: '2024-12-18', time: '14:00', patient: 'Fernanda Costa', status: 'Realizada', observacoes: 'Trabalhamos ansiedade, exercícios de respiração' },
    { id: 3, date: '2024-12-15', time: '10:00', patient: 'Marcos Silva', status: 'Faltou', observacoes: 'Paciente não compareceu' },
    { id: 4, date: '2024-12-12', time: '16:00', patient: 'Lucia Santos', status: 'Realizada', observacoes: 'Discussão sobre relacionamentos familiares' },
    { id: 5, date: '2024-12-10', time: '11:00', patient: 'Paulo Lima', status: 'Realizada', observacoes: 'Sessão focada em autoestima e confiança' },
    { id: 6, date: '2024-12-08', time: '15:00', patient: 'Carla Mendes', status: 'Realizada', observacoes: 'Progresso significativo no tratamento' },
    { id: 7, date: '2024-12-05', time: '09:30', patient: 'Eduardo Rocha', status: 'Realizada', observacoes: 'Sessão de acompanhamento, paciente estável' }
  ])
  const [consultasCanceladas, setConsultasCanceladas] = useState([
    { id: 1, date: '2024-12-22', time: '14:00', patient: 'Ana Costa', motivo: 'Paciente doente', canceladoPor: 'Paciente', dataCancelamento: '2024-12-21' },
    { id: 2, date: '2024-12-19', time: '10:00', patient: 'Carlos Lima', motivo: 'Emergência familiar', canceladoPor: 'Profissional', dataCancelamento: '2024-12-18' },
    { id: 3, date: '2024-12-14', time: '16:30', patient: 'Maria Santos', motivo: 'Viagem imprevista', canceladoPor: 'Paciente', dataCancelamento: '2024-12-13' }
  ])
  const [isScrolled, setIsScrolled] = useState(false)
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [locationData, setLocationData] = useState({
    endereco: 'Rua das Clínicas, 123',
    complemento: 'Sala 101',
    bairro: 'Centro',
    cidade: 'São Paulo',
    cep: '01234-567'
  })
  const [copyMode, setCopyMode] = useState(false)
  const [selectedDaysForCopy, setSelectedDaysForCopy] = useState([])
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, icon: '👥', title: 'Nova consulta agendada', message: 'Maria Silva agendou consulta para 15/01 às 14:00', time: 'Há 1 hora', read: false },
    { id: 2, icon: '⚠️', title: 'Cancelamento de consulta', message: 'João Santos cancelou a consulta de amanhã às 10:00', time: 'Há 3 horas', read: false },
    { id: 3, icon: '🔔', title: 'Lembrete de agenda', message: 'Você tem 5 consultas agendadas para hoje', time: 'Há 6 horas', read: false }
  ])
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState('Dr. João Santos Silva')
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [editedEmail, setEditedEmail] = useState('dr.joao@adcpsicologia.com')
  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [editedPhone, setEditedPhone] = useState('(11) 98888-8888')
  const unreadNotifications = useMemo(() => notificationsList.filter(n => !n.read).length, [notificationsList])
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    navigate('/')
  }

  const timeSlots = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ]

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const currentDate = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      const dateStr = currentDate.toISOString().split('T')[0]
      const isCurrentMonth = currentDate.getMonth() === currentMonth
      const hasAgenda = agenda[dateStr] && agenda[dateStr].length > 0
      
      days.push(
        <div
          key={dateStr}
          className={`calendar-day ${
            isCurrentMonth ? 'current-month' : 'other-month'
          } ${
            selectedDate === dateStr && !copyMode ? 'selected' : ''
          } ${
            selectedDaysForCopy.includes(dateStr) && copyMode ? 'selected' : ''
          } ${
            hasAgenda ? 'has-agenda' : ''
          }`}
          onClick={() => {
            if (isCurrentMonth) {
              if (copyMode) {
                setSelectedDaysForCopy(prev => 
                  prev.includes(dateStr) 
                    ? prev.filter(d => d !== dateStr)
                    : [...prev, dateStr]
                )
              } else {
                setSelectedDate(dateStr)
                setSelectedTimes(agenda[dateStr] || [])
              }
            }
          }}
        >
          {currentDate.getDate()}
        </div>
      )
      
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return days
  }

  const toggleTimeSlot = (time) => {
    setSelectedTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    )
  }

  const saveAgenda = () => {
    if (selectedDate && selectedTimes.length > 0) {
      setAgenda(prev => ({
        ...prev,
        [selectedDate]: selectedTimes
      }))
      alert(`Agenda salva para ${selectedDate}!`)
    }
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'criar-agenda', label: 'Criar Agenda', icon: '📅' },
    { id: 'visualizar-agenda', label: 'Visualizar Agenda', icon: '👁️' },
    { id: 'consultas-passadas', label: 'Consultas Passadas', icon: '📋' },
    { id: 'cancelar-consultas', label: 'Cancelar Consultas', icon: '❌' },
    { id: 'consultas-canceladas', label: 'Consultas Canceladas', icon: '🚫' },
    { id: 'pacientes', label: 'Gerenciar Pacientes', icon: '👥' },
    { id: 'prontuarios', label: 'Prontuários', icon: '📝' },
    { id: 'financeiro', label: 'Financeiro', icon: '💰' },
    { id: 'relatorios', label: 'Relatórios', icon: '📈' },
    { id: 'configuracoes', label: 'Configurações', icon: '⚙️' },
    { id: 'locais', label: 'Locais de Atendimento', icon: '🏥' },
    { id: 'agenda-bloqueios', label: 'Bloqueios de Agenda', icon: '🔒' },
    { id: 'lembretes', label: 'Lembretes', icon: '⏰' }
  ]

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        const hoje = new Date().toISOString().split('T')[0]
        const consultasHoje = consultas.filter(c => c.date === hoje)
        const consultasConfirmadas = consultasHoje.filter(c => c.status === 'Confirmado')
        const consultasPendentes = consultasHoje.filter(c => c.status === 'Pendente')
        
        return (
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#1e293b', marginBottom: '5px' }}>Dashboard</h2>
              <p style={{ color: '#64748b', margin: 0 }}>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: '#3b82f6', color: 'white', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{consultasHoje.length}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Consultas Hoje</div>
              </div>
              
              <div style={{ background: '#10b981', color: 'white', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{consultas.length}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Agendadas</div>
              </div>
              
              <div style={{ background: '#f59e0b', color: 'white', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{consultasPassadas.length}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Realizadas</div>
              </div>
              
              <div style={{ background: '#8b5cf6', color: 'white', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>4.8</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Avaliação</div>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e293b', marginBottom: '20px' }}>Agenda de Hoje</h3>
                {consultasHoje.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    <p>Nenhuma consulta hoje</p>
                  </div>
                ) : (
                  <div>
                    {consultasHoje.map(consulta => (
                      <div key={consulta.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        background: '#f8fafc',
                        borderRadius: '8px',
                        marginBottom: '8px'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600' }}>{consulta.time}</div>
                          <div style={{ color: '#64748b', fontSize: '14px' }}>{consulta.patient}</div>
                        </div>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          background: consulta.status === 'Confirmado' ? '#d1fae5' : '#fef3c7',
                          color: consulta.status === 'Confirmado' ? '#065f46' : '#92400e'
                        }}>
                          {consulta.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e293b', marginBottom: '20px' }}>Ações Rápidas</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button 
                    onClick={() => setActiveSection('criar-agenda')}
                    style={{
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Criar Agenda
                  </button>
                  <button 
                    onClick={() => setActiveSection('visualizar-agenda')}
                    style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Ver Agenda
                  </button>
                  <button 
                    onClick={() => setActiveSection('pacientes')}
                    style={{
                      background: '#f59e0b',
                      color: 'white',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Pacientes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      case 'criar-agenda':
        return (
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#1e293b', marginBottom: '5px' }}>Criar Agenda</h2>
              <p style={{ color: '#64748b', margin: 0 }}>Selecione os dias e horários</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ color: '#1e293b', margin: 0 }}>Calendário</h3>
                  {copyMode && (
                    <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                      Modo Copia - Selecione os dias
                    </span>
                  )}
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <button 
                      onClick={() => {
                        if (currentMonth === 0) {
                          setCurrentMonth(11)
                          setCurrentYear(currentYear - 1)
                        } else {
                          setCurrentMonth(currentMonth - 1)
                        }
                      }}
                      style={{ background: '#f3f4f6', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      ←
                    </button>
                    <h4 style={{ margin: 0 }}>
                      {new Date(currentYear, currentMonth).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                    </h4>
                    <button 
                      onClick={() => {
                        if (currentMonth === 11) {
                          setCurrentMonth(0)
                          setCurrentYear(currentYear + 1)
                        } else {
                          setCurrentMonth(currentMonth + 1)
                        }
                      }}
                      style={{ background: '#f3f4f6', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      →
                    </button>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '10px' }}>
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                      <div key={day} style={{ padding: '8px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                    {generateCalendar()}
                  </div>
                </div>
              </div>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e293b', marginBottom: '20px' }}>Horários</h3>
                {selectedDate ? (
                  <div>
                    <p style={{ marginBottom: '15px', color: '#64748b' }}>
                      Data: {new Date(selectedDate).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                      {timeSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => toggleTimeSlot(slot)}
                          style={{
                            padding: '8px',
                            border: '2px solid',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            background: selectedTimes.includes(slot) ? '#3b82f6' : 'white',
                            color: selectedTimes.includes(slot) ? 'white' : '#374151',
                            borderColor: selectedTimes.includes(slot) ? '#3b82f6' : '#d1d5db'
                          }}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button 
                        onClick={saveAgenda}
                        disabled={selectedTimes.length === 0}
                        style={{
                          flex: '1',
                          padding: '12px',
                          background: selectedTimes.length > 0 ? '#10b981' : '#d1d5db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: selectedTimes.length > 0 ? 'pointer' : 'not-allowed'
                        }}
                      >
                        Salvar ({selectedTimes.length})
                      </button>
                      {!copyMode ? (
                        <button 
                          onClick={() => {
                            if (selectedTimes.length > 0) {
                              setCopyMode(true)
                              setSelectedDaysForCopy([])
                            }
                          }}
                          disabled={selectedTimes.length === 0}
                          style={{
                            padding: '12px',
                            background: selectedTimes.length > 0 ? '#f59e0b' : '#d1d5db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: selectedTimes.length > 0 ? 'pointer' : 'not-allowed'
                          }}
                        >
                          Copiar
                        </button>
                      ) : (
                        <>
                          <button 
                            onClick={() => {
                              if (selectedDaysForCopy.length > 0) {
                                const newAgenda = { ...agenda }
                                selectedDaysForCopy.forEach(date => {
                                  newAgenda[date] = [...selectedTimes]
                                })
                                setAgenda(newAgenda)
                                setCopyMode(false)
                                setSelectedDaysForCopy([])
                                alert(`Horários copiados para ${selectedDaysForCopy.length} dias!`)
                              }
                            }}
                            disabled={selectedDaysForCopy.length === 0}
                            style={{
                              padding: '12px',
                              background: selectedDaysForCopy.length > 0 ? '#10b981' : '#d1d5db',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: selectedDaysForCopy.length > 0 ? 'pointer' : 'not-allowed'
                            }}
                          >
                            Aplicar ({selectedDaysForCopy.length})
                          </button>
                          <button 
                            onClick={() => {
                              setCopyMode(false)
                              setSelectedDaysForCopy([])
                            }}
                            style={{
                              padding: '12px',
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer'
                            }}
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>Selecione um dia no calendário</p>
                )}
                
                {Object.keys(agenda).length > 0 && (
                  <div style={{ marginTop: '30px' }}>
                    <h4 style={{ color: '#1e293b', marginBottom: '15px' }}>Agenda Criada</h4>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {Object.entries(agenda).map(([date, times]) => (
                        <div key={date} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px',
                          background: '#f8fafc',
                          borderRadius: '6px',
                          marginBottom: '5px'
                        }}>
                          <div>
                            <div style={{ fontWeight: '600', fontSize: '14px' }}>
                              {new Date(date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>
                              {times.length} horários
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              const newAgenda = { ...agenda }
                              delete newAgenda[date]
                              setAgenda(newAgenda)
                            }}
                            style={{
                              background: '#fee2e2',
                              color: '#dc2626',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      case 'visualizar-agenda':
        const today = new Date().toISOString().split('T')[0]
        const todayConsultas = consultas.filter(c => c.date === today)
        const selectedDateConsultas = consultas.filter(c => c.date === viewDate)
        
        return (
          <div className="section-content">
            <h2>Visualizar Agenda</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#1e293b', marginBottom: '15px' }}>Consultas de Hoje</h3>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '15px' }}>
                  {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
                {todayConsultas.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>
                    <p>Nenhuma consulta hoje</p>
                  </div>
                ) : (
                  <div>
                    {todayConsultas.map(consulta => (
                      <div key={consulta.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        background: '#f8fafc',
                        borderRadius: '8px',
                        marginBottom: '8px'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600' }}>{consulta.time}</div>
                          <div style={{ fontSize: '14px', color: '#64748b' }}>{consulta.patient}</div>
                        </div>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          background: consulta.status === 'Confirmado' ? '#d1fae5' : '#fef3c7',
                          color: consulta.status === 'Confirmado' ? '#065f46' : '#92400e'
                        }}>
                          {consulta.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div style={{ marginTop: '30px' }}>
                  <h4 style={{ color: '#1e293b', marginBottom: '15px' }}>Calendário</h4>
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <button 
                        onClick={() => {
                          if (currentMonth === 0) {
                            setCurrentMonth(11)
                            setCurrentYear(currentYear - 1)
                          } else {
                            setCurrentMonth(currentMonth - 1)
                          }
                        }}
                        style={{ background: '#f3f4f6', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        ←
                      </button>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>
                        {new Date(currentYear, currentMonth).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                      </span>
                      <button 
                        onClick={() => {
                          if (currentMonth === 11) {
                            setCurrentMonth(0)
                            setCurrentYear(currentYear + 1)
                          } else {
                            setCurrentMonth(currentMonth + 1)
                          }
                        }}
                        style={{ background: '#f3f4f6', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        →
                      </button>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', marginBottom: '5px' }}>
                      {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(day => (
                        <div key={day} style={{ padding: '4px', textAlign: 'center', fontSize: '10px', fontWeight: '600', color: '#64748b' }}>
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
                      {generateCalendar().map((day, index) => (
                        <div key={index} style={{
                          ...day.props.style,
                          padding: '6px 4px',
                          textAlign: 'center',
                          fontSize: '12px',
                          cursor: 'pointer',
                          borderRadius: '4px',
                          background: viewDate === day.key ? '#3b82f6' : day.props.className.includes('has-agenda') ? '#e0f2fe' : 'transparent',
                          color: viewDate === day.key ? 'white' : day.props.className.includes('other-month') ? '#d1d5db' : '#374151'
                        }}
                        onClick={() => {
                          if (day.props.className.includes('current-month')) {
                            setViewDate(day.key)
                          }
                        }}
                        >
                          {day.props.children}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#1e293b', marginBottom: '15px' }}>Consultas do Dia</h3>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '15px' }}>
                  {new Date(viewDate).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
                
                {selectedDateConsultas.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>
                    <p>Nenhuma consulta nesta data</p>
                  </div>
                ) : (
                  <div>
                    {selectedDateConsultas.map(consulta => (
                      <div key={consulta.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        background: '#f0f9ff',
                        borderRadius: '8px',
                        marginBottom: '8px'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '14px' }}>{consulta.time}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{consulta.patient}</div>
                        </div>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          background: consulta.status === 'Confirmado' ? '#dcfce7' : '#fef3c7',
                          color: consulta.status === 'Confirmado' ? '#166534' : '#92400e'
                        }}>
                          {consulta.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      case 'consultas-passadas':
        return (
          <div className="section-content">
            <h2>Consultas Passadas</h2>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#1e40af', margin: 0 }}>Histórico de Atendimentos</h3>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Total: {consultasPassadas.length} consultas
                </div>
              </div>
              
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {consultasPassadas.map(consulta => (
                  <div key={consulta.id} style={{
                    padding: '15px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    borderLeft: consulta.status === 'Realizada' ? '4px solid #10b981' : '4px solid #ef4444'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '16px' }}>
                          {consulta.patient}
                        </div>
                        <div style={{ fontSize: '14px', color: '#6b7280' }}>
                          {new Date(consulta.date).toLocaleDateString('pt-BR', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })} - {consulta.time}
                        </div>
                      </div>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: consulta.status === 'Realizada' ? '#d1fae5' : '#fee2e2',
                        color: consulta.status === 'Realizada' ? '#065f46' : '#991b1b'
                      }}>
                        {consulta.status}
                      </span>
                    </div>
                    
                    {consulta.observacoes && (
                      <div style={{
                        background: 'white',
                        padding: '10px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        color: '#374151',
                        fontStyle: 'italic',
                        border: '1px solid #e5e7eb'
                      }}>
                        📝 {consulta.observacoes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '2px' }}></div>
                    <span>Realizadas: {consultasPassadas.filter(c => c.status === 'Realizada').length}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '2px' }}></div>
                    <span>Faltas: {consultasPassadas.filter(c => c.status === 'Faltou').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'cancelar-consultas':
        const consultasFuturas = consultas.filter(c => new Date(c.date) >= new Date())
        
        return (
          <div className="section-content">
            <h2>Cancelar Consultas</h2>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>Consultas Agendadas</h3>
              
              {consultasFuturas.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📅</div>
                  <p>Nenhuma consulta agendada para cancelar</p>
                </div>
              ) : (
                <div>
                  {consultasFuturas.map(consulta => (
                    <div key={consulta.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '15px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      marginBottom: '10px',
                      borderLeft: '4px solid #f59e0b'
                    }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '16px' }}>
                          {consulta.patient}
                        </div>
                        <div style={{ fontSize: '14px', color: '#6b7280' }}>
                          {new Date(consulta.date).toLocaleDateString('pt-BR', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long' 
                          })} - {consulta.time}
                        </div>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: consulta.status === 'Confirmado' ? '#d1fae5' : '#fef3c7',
                          color: consulta.status === 'Confirmado' ? '#065f46' : '#92400e'
                        }}>
                          {consulta.status}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => {
                          const motivo = prompt('Motivo do cancelamento:')
                          if (motivo) {
                            const novoCancelamento = {
                              id: consultasCanceladas.length + 1,
                              date: consulta.date,
                              time: consulta.time,
                              patient: consulta.patient,
                              motivo,
                              canceladoPor: 'Profissional',
                              dataCancelamento: new Date().toISOString().split('T')[0]
                            }
                            setConsultasCanceladas([...consultasCanceladas, novoCancelamento])
                            alert('Consulta cancelada com sucesso!')
                          }
                        }}
                        style={{
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '14px'
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      case 'consultas-canceladas':
        return (
          <div className="section-content">
            <h2>Consultas Canceladas</h2>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#1e40af', margin: 0 }}>Histórico de Cancelamentos</h3>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Total: {consultasCanceladas.length} cancelamentos
                </div>
              </div>
              
              {consultasCanceladas.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎉</div>
                  <p>Nenhuma consulta foi cancelada</p>
                  <small>Isso é ótimo! Significa que não houve cancelamentos.</small>
                </div>
              ) : (
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  {consultasCanceladas.map(consulta => (
                    <div key={consulta.id} style={{
                      padding: '15px',
                      background: '#fef2f2',
                      borderRadius: '8px',
                      marginBottom: '10px',
                      borderLeft: '4px solid #ef4444'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '16px' }}>
                            {consulta.patient}
                          </div>
                          <div style={{ fontSize: '14px', color: '#6b7280' }}>
                            {new Date(consulta.date).toLocaleDateString('pt-BR', { 
                              weekday: 'long', 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })} - {consulta.time}
                          </div>
                        </div>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: '#fee2e2',
                          color: '#991b1b'
                        }}>
                          Cancelada
                        </span>
                      </div>
                      
                      <div style={{
                        background: 'white',
                        padding: '10px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        marginBottom: '8px'
                      }}>
                        <div style={{ color: '#374151', marginBottom: '4px' }}>
                          <strong>Motivo:</strong> {consulta.motivo}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          Cancelado por: <strong>{consulta.canceladoPor}</strong> em {new Date(consulta.dataCancelamento).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      case 'pacientes':
        return (
          <div className="section-content">
            <h2>👥 Gerenciar Pacientes</h2>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#1e293b', margin: 0 }}>Lista de Pacientes</h3>
                <button style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}>
                  + Novo Paciente
                </button>
              </div>
              
              <div style={{ display: 'grid', gap: '15px' }}>
                {[
                  { nome: 'Maria Silva', idade: 28, telefone: '(11) 99999-1111', ultimaConsulta: '2025-01-10', status: 'Ativo' },
                  { nome: 'João Santos', idade: 35, telefone: '(11) 99999-2222', ultimaConsulta: '2025-01-08', status: 'Ativo' },
                  { nome: 'Ana Costa', idade: 42, telefone: '(11) 99999-3333', ultimaConsulta: '2024-12-20', status: 'Inativo' },
                  { nome: 'Carlos Lima', idade: 31, telefone: '(11) 99999-4444', ultimaConsulta: '2025-01-05', status: 'Ativo' }
                ].map((paciente, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${paciente.status === 'Ativo' ? '#10b981' : '#f59e0b'}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: '#e0f2fe',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px'
                      }}>👤</div>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '16px' }}>{paciente.nome}</div>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>{paciente.idade} anos • {paciente.telefone}</div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Última consulta: {new Date(paciente.ultimaConsulta).toLocaleDateString('pt-BR')}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        background: paciente.status === 'Ativo' ? '#d1fae5' : '#fef3c7',
                        color: paciente.status === 'Ativo' ? '#065f46' : '#92400e'
                      }}>
                        {paciente.status}
                      </span>
                      <button style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}>
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'prontuarios':
        return (
          <div className="section-content">
            <h2>📝 Prontuários</h2>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '20px' }}>Prontuários dos Pacientes</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {[
                  { paciente: 'Maria Silva', sessoes: 12, ultimaAtualizacao: '2025-01-10' },
                  { paciente: 'João Santos', sessoes: 8, ultimaAtualizacao: '2025-01-08' },
                  { paciente: 'Carlos Lima', sessoes: 15, ultimaAtualizacao: '2025-01-05' }
                ].map((prontuario, index) => (
                  <div key={index} style={{
                    padding: '20px',
                    background: '#f0f9ff',
                    borderRadius: '12px',
                    border: '1px solid #e0f2fe'
                  }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#1e40af' }}>{prontuario.paciente}</h4>
                    <p style={{ margin: '5px 0', fontSize: '14px', color: '#64748b' }}>{prontuario.sessoes} sessões registradas</p>
                    <p style={{ margin: '5px 0', fontSize: '12px', color: '#9ca3af' }}>Última atualização: {new Date(prontuario.ultimaAtualizacao).toLocaleDateString('pt-BR')}</p>
                    <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                      <button style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}>
                        Visualizar
                      </button>
                      <button style={{
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}>
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'financeiro':
        return (
          <div className="section-content">
            <h2>💰 Financeiro</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: '#10b981', color: 'white', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>R$ 4.850,00</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Receita do Mês</div>
              </div>
              <div style={{ background: '#f59e0b', color: 'white', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>R$ 1.200,00</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Pendente</div>
              </div>
              <div style={{ background: '#3b82f6', color: 'white', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>R$ 3.650,00</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Recebido</div>
              </div>
            </div>
            
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '20px' }}>Últimas Transações</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {[
                  { paciente: 'Maria Silva', valor: 'R$ 150,00', data: '2025-01-10', status: 'Pago' },
                  { paciente: 'João Santos', valor: 'R$ 150,00', data: '2025-01-08', status: 'Pago' },
                  { paciente: 'Ana Costa', valor: 'R$ 150,00', data: '2025-01-05', status: 'Pendente' },
                  { paciente: 'Carlos Lima', valor: 'R$ 150,00', data: '2025-01-03', status: 'Pago' }
                ].map((transacao, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    background: '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600' }}>{transacao.paciente}</div>
                      <div style={{ fontSize: '14px', color: '#64748b' }}>{new Date(transacao.data).toLocaleDateString('pt-BR')}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600' }}>{transacao.valor}</div>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        background: transacao.status === 'Pago' ? '#d1fae5' : '#fef3c7',
                        color: transacao.status === 'Pago' ? '#065f46' : '#92400e'
                      }}>
                        {transacao.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'relatorios':
        return (
          <div className="section-content">
            <h2>📈 Relatórios</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {[
                { titulo: 'Relatório Mensal', descricao: 'Consultas e receitas do mês', icon: '📊' },
                { titulo: 'Relatório de Pacientes', descricao: 'Lista completa de pacientes', icon: '👥' },
                { titulo: 'Relatório Financeiro', descricao: 'Análise financeira detalhada', icon: '💰' },
                { titulo: 'Relatório de Faltas', descricao: 'Pacientes que faltaram', icon: '❌' }
              ].map((relatorio, index) => (
                <div key={index} style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '15px' }}>{relatorio.icon}</div>
                  <h4 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>{relatorio.titulo}</h4>
                  <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#64748b' }}>{relatorio.descricao}</p>
                  <button style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    width: '100%'
                  }}>
                    Gerar Relatório
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      case 'configuracoes':
        return (
          <div className="section-content">
            <h2>⚙️ Configurações</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e293b', marginBottom: '20px' }}>Configurações Gerais</h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Notificações por email</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Lembrete de consultas</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Backup automático</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e293b', marginBottom: '20px' }}>Configurações de Agenda</h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Duração padrão da consulta</label>
                    <select style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}>
                      <option>50 minutos</option>
                      <option>60 minutos</option>
                      <option>90 minutos</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Intervalo entre consultas</label>
                    <select style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}>
                      <option>10 minutos</option>
                      <option>15 minutos</option>
                      <option>30 minutos</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'agenda-bloqueios':
        return (
          <div className="section-content">
            <h2>🔒 Bloqueios de Agenda</h2>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#1e293b', margin: 0 }}>Períodos Bloqueados</h3>
                <button style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}>
                  + Novo Bloqueio
                </button>
              </div>
              
              <div style={{ display: 'grid', gap: '15px' }}>
                {[
                  { periodo: 'Férias de Janeiro', inicio: '2025-01-20', fim: '2025-01-30', motivo: 'Férias programadas' },
                  { periodo: 'Congresso de Psicologia', inicio: '2025-02-15', fim: '2025-02-17', motivo: 'Participação em evento' },
                  { periodo: 'Feriado Carnaval', inicio: '2025-02-28', fim: '2025-03-04', motivo: 'Feriado nacional' }
                ].map((bloqueio, index) => (
                  <div key={index} style={{
                    padding: '15px',
                    background: '#fef2f2',
                    borderRadius: '8px',
                    borderLeft: '4px solid #ef4444'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '16px' }}>{bloqueio.periodo}</div>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>
                          {new Date(bloqueio.inicio).toLocaleDateString('pt-BR')} até {new Date(bloqueio.fim).toLocaleDateString('pt-BR')}
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>{bloqueio.motivo}</div>
                      </div>
                      <button style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}>
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'lembretes':
        return (
          <div className="section-content">
            <h2>⏰ Lembretes</h2>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#1e293b', margin: 0 }}>Lembretes Ativos</h3>
                <button style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}>
                  + Novo Lembrete
                </button>
              </div>
              
              <div style={{ display: 'grid', gap: '15px' }}>
                {[
                  { titulo: 'Renovar CRP', data: '2025-03-15', prioridade: 'Alta', descricao: 'Renovação do registro profissional' },
                  { titulo: 'Reunião de equipe', data: '2025-01-25', prioridade: 'Média', descricao: 'Reunião mensal da equipe clínica' },
                  { titulo: 'Atualizar prontuários', data: '2025-01-20', prioridade: 'Baixa', descricao: 'Revisar e atualizar prontuários pendentes' }
                ].map((lembrete, index) => (
                  <div key={index} style={{
                    padding: '15px',
                    background: '#f0f9ff',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${lembrete.prioridade === 'Alta' ? '#ef4444' : lembrete.prioridade === 'Média' ? '#f59e0b' : '#10b981'}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '16px' }}>{lembrete.titulo}</div>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>{lembrete.descricao}</div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Data: {new Date(lembrete.data).toLocaleDateString('pt-BR')}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          background: lembrete.prioridade === 'Alta' ? '#fee2e2' : lembrete.prioridade === 'Média' ? '#fef3c7' : '#d1fae5',
                          color: lembrete.prioridade === 'Alta' ? '#991b1b' : lembrete.prioridade === 'Média' ? '#92400e' : '#065f46'
                        }}>
                          {lembrete.prioridade}
                        </span>
                        <button style={{
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}>
                          Concluir
                        </button>
                      </div>
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
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              {notificationsList.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>
                  <p>Nenhuma notificação</p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    {notificationsList.map(notification => (
                      <div key={notification.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        padding: '15px',
                        background: notification.read ? '#f8fafc' : '#eff6ff',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        borderLeft: notification.read ? '4px solid #e5e7eb' : '4px solid #3b82f6'
                      }}>
                        <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                          <div style={{ fontSize: '20px' }}>{notification.icon}</div>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#1e293b' }}>{notification.title}</h4>
                            <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#64748b' }}>{notification.message}</p>
                            <span style={{ fontSize: '12px', color: '#9ca3af' }}>{notification.time}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {!notification.read && (
                            <button
                              onClick={() => {
                                setNotificationsList(prev => 
                                  prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
                                )
                              }}
                              style={{
                                background: '#10b981',
                                color: 'white',
                                border: 'none',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              Marcar como lida
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setNotificationsList(prev => prev.filter(n => n.id !== notification.id))
                            }}
                            style={{
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Apagar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => {
                        setNotificationsList(prev => prev.map(n => ({ ...n, read: true })))
                      }}
                      style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Marcar todas como lidas
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm('Tem certeza que deseja apagar todas as mensagens?')) {
                          setNotificationsList([])
                        }
                      }}
                      style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Apagar mensagens
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      case 'locais':
        return (
          <div className="section-content">
            <h2>Clínica</h2>
            <div className="form-card">
              <div style={{ display: 'grid', gap: '25px' }}>
                <div style={{
                  background: 'white',
                  padding: '25px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}>
                  <h4 style={{ color: '#1e293b', marginBottom: '20px', fontSize: '18px' }}>Informações de Localização</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Endereço:</label>
                      {isEditingLocation ? (
                        <input 
                          type="text" 
                          value={locationData.endereco}
                          onChange={(e) => setLocationData({...locationData, endereco: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #3b82f6',
                            borderRadius: '8px',
                            fontSize: '14px'
                          }} 
                        />
                      ) : (
                        <div style={{
                          padding: '12px',
                          background: '#f9fafb',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#374151'
                        }}>
                          {locationData.endereco}
                        </div>
                      )}
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Complemento:</label>
                      {isEditingLocation ? (
                        <input 
                          type="text" 
                          value={locationData.complemento}
                          onChange={(e) => setLocationData({...locationData, complemento: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #3b82f6',
                            borderRadius: '8px',
                            fontSize: '14px'
                          }} 
                        />
                      ) : (
                        <div style={{
                          padding: '12px',
                          background: '#f9fafb',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#374151'
                        }}>
                          {locationData.complemento}
                        </div>
                      )}
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Bairro:</label>
                      {isEditingLocation ? (
                        <input 
                          type="text" 
                          value={locationData.bairro}
                          onChange={(e) => setLocationData({...locationData, bairro: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #3b82f6',
                            borderRadius: '8px',
                            fontSize: '14px'
                          }} 
                        />
                      ) : (
                        <div style={{
                          padding: '12px',
                          background: '#f9fafb',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#374151'
                        }}>
                          {locationData.bairro}
                        </div>
                      )}
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Cidade:</label>
                      {isEditingLocation ? (
                        <input 
                          type="text" 
                          value={locationData.cidade}
                          onChange={(e) => setLocationData({...locationData, cidade: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #3b82f6',
                            borderRadius: '8px',
                            fontSize: '14px'
                          }} 
                        />
                      ) : (
                        <div style={{
                          padding: '12px',
                          background: '#f9fafb',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#374151'
                        }}>
                          {locationData.cidade}
                        </div>
                      )}
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>CEP:</label>
                      {isEditingLocation ? (
                        <input 
                          type="text" 
                          value={locationData.cep}
                          onChange={(e) => setLocationData({...locationData, cep: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #3b82f6',
                            borderRadius: '8px',
                            fontSize: '14px'
                          }} 
                        />
                      ) : (
                        <div style={{
                          padding: '12px',
                          background: '#f9fafb',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#374151'
                        }}>
                          {locationData.cep}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Imagem da Clínica:</label>
                    <div style={{
                      border: '2px dashed #d1d5db',
                      borderRadius: '12px',
                      padding: '40px',
                      textAlign: 'center',
                      background: '#f9fafb'
                    }}>
                      <input type="file" accept="image/*" style={{ display: 'none' }} id="clinic-image" />
                      <label htmlFor="clinic-image" style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <div style={{ fontSize: '48px', color: '#9ca3af' }}>📷</div>
                        <div style={{ color: '#6b7280', fontSize: '16px' }}>Clique para adicionar uma imagem</div>
                        <div style={{ color: '#9ca3af', fontSize: '14px' }}>PNG, JPG até 5MB</div>
                      </label>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px' }}>
                    {isEditingLocation ? (
                      <>
                        <button 
                          onClick={() => {
                            setIsEditingLocation(false)
                            alert('Informações salvas com sucesso!')
                          }}
                          style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          Salvar Alterações
                        </button>
                        <button 
                          onClick={() => {
                            setIsEditingLocation(false)
                            setLocationData({
                              endereco: 'Rua das Clínicas, 123',
                              complemento: 'Sala 101',
                              bairro: 'Centro',
                              cidade: 'São Paulo',
                              cep: '01234-567'
                            })
                          }}
                          style={{
                            background: '#f3f4f6',
                            color: '#374151',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => setIsEditingLocation(true)}
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        Editar Localização
                      </button>
                    )}
                  </div>
                </div>
              </div>
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
                  <div className="avatar-circle">👨⚕️</div>
                  <button className="change-photo-btn">Alterar Foto</button>
                </div>
                <div className="profile-info">
                  <h3>Dr. João Santos</h3>
                  <p className="profile-type">Psicólogo Clínico</p>
                  <p className="member-since">CRP: 06/123456 | Ativo desde: Janeiro 2020</p>
                </div>
              </div>
              
              <div className="profile-details">
                <div className="detail-section">
                  <h4>Informações Profissionais</h4>
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
                                setEditedName('Dr. João Santos Silva')
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
                      <label>CRP</label>
                      <span>06/123456</span>
                    </div>
                    <div className="detail-item">
                      <label>Especialidade</label>
                      <span>Terapia Cognitivo-Comportamental</span>
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
                                setEditedEmail('dr.joao@adcpsicologia.com')
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
                                setEditedPhone('(11) 98888-8888')
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
                      <label>Formação</label>
                      <span>Psicologia - USP (2018)</span>
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
      <div className="sidebar-fixed">
        <div className="sidebar-header">
          <h2>ADC</h2>
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
          <button
            className={`nav-item ${activeSection === 'notificacoes' ? 'active' : ''}`}
            onClick={() => setActiveSection('notificacoes')}
          >
            <span className="nav-label">Notificações</span>
            {unreadNotifications > 0 && <span className="notification-badge">{unreadNotifications}</span>}
          </button>
          
          <button
            className={`nav-item ${activeSection === 'perfil' ? 'active' : ''}`}
            onClick={() => setActiveSection('perfil')}
          >
            <span className="nav-label">Meu Perfil</span>
          </button>
          
          <button className="nav-item logout" onClick={handleLogout}>
            <span className="nav-label">Sair</span>
          </button>
          

        </div>
      </div>
      
      <div className="main-content">
        <header 
          className="top-header" 
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'white',
            borderBottom: '1px solid #e5e7eb',
            padding: isScrolled ? '10px 30px' : '20px 30px',
            transition: 'all 0.3s ease',
            boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <h1 style={{
            color: '#1e293b',
            margin: 0,
            fontSize: isScrolled ? '18px' : '24px',
            transition: 'all 0.3s ease'
          }}>
            {isScrolled ? 'Dr. Psicólogo' : 'Bem-vindo, Dr. Psicólogo'}
          </h1>
        </header>
        
        <div className="content-area" style={{ paddingTop: '20px' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default AreaProfissional