import { useState, useMemo } from 'react'
import './AreaProfissional.css'
import { useNavigate } from 'react-router-dom'

const AreaProfissional = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [notifications] = useState(3)
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
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/')
  }

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']

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
            selectedDate === dateStr ? 'selected' : ''
          } ${
            hasAgenda ? 'has-agenda' : ''
          }`}
          onClick={() => {
            if (isCurrentMonth) {
              setSelectedDate(dateStr)
              setSelectedTimes(agenda[dateStr] || [])
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
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'criar-agenda', icon: '📅', label: 'Criar Agenda' },
    { id: 'visualizar-agenda', icon: '📋', label: 'Visualizar Agenda' },
    { id: 'consultas-passadas', icon: '📄', label: 'Consultas Passadas' },
    { id: 'cancelar-consultas', icon: '❌', label: 'Cancelar Consultas' },
    { id: 'consultas-canceladas', icon: '🚫', label: 'Consultas Canceladas' },
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
          <div style={{
            fontFamily: 'Inter, sans-serif',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '5px'
          }}>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '20px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
                }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#1e293b', fontSize: '14px' }}>Configuração Rápida</h3>
                  <button 
                    onClick={() => {
                      const today = new Date()
                      const newAgenda = {}
                      for (let i = 1; i <= 7; i++) {
                        const date = new Date(today)
                        date.setDate(today.getDate() + i)
                        if (date.getDay() !== 0 && date.getDay() !== 6) {
                          const dateStr = date.toISOString().split('T')[0]
                          newAgenda[dateStr] = ['09:00', '10:00', '14:00', '15:00', '16:00']
                        }
                      }
                      setAgenda(prev => ({ ...prev, ...newAgenda }))
                      alert('Agenda da semana criada!')
                    }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '12px',
                      marginBottom: '8px'
                    }}
                  >
                    📅 Próxima Semana
                  </button>
                  <button 
                    onClick={() => {
                      const today = new Date()
                      const newAgenda = {}
                      const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
                      
                      for (let day = today.getDate(); day <= daysInMonth; day++) {
                        const date = new Date(today.getFullYear(), today.getMonth(), day)
                        if (date.getDay() !== 0 && date.getDay() !== 6) {
                          const dateStr = date.toISOString().split('T')[0]
                          newAgenda[dateStr] = ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00']
                        }
                      }
                      setAgenda(prev => ({ ...prev, ...newAgenda }))
                      alert('Agenda do mês criada!')
                    }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '12px'
                    }}
                  >
                    📆 Este Mês
                  </button>
                </div>

                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '20px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
                }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#1e293b', fontSize: '14px' }}>Agenda Atual</h3>
                  {Object.keys(agenda).length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📅</div>
                      <p>Nenhuma agenda criada</p>
                    </div>
                  ) : (
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                      {Object.entries(agenda).slice(0, 5).map(([date, times]) => {
                        const [year, month, day] = date.split('-')
                        return (
                          <div key={date} style={{
                            padding: '5px',
                            background: '#f8fafc',
                            borderRadius: '6px',
                            marginBottom: '4px',
                            borderLeft: '3px solid #667eea'
                          }}>
                            <div style={{ fontWeight: '600', fontSize: '12px', color: '#667eea' }}>
                              {new Date(date).toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase()}
                            </div>
                            <div style={{ fontSize: '14px', color: '#374151' }}>{day}/{month}</div>
                            <div style={{ fontSize: '11px', color: '#6b7280' }}>
                              {times.length} horários
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '16px' }}>Configuração Personalizada</h3>
                  <input 
                    type="date" 
                    value={selectedDate || ''}
                    onChange={(e) => {
                      setSelectedDate(e.target.value)
                      setSelectedTimes(agenda[e.target.value] || [])
                    }}
                    min={new Date().toISOString().split('T')[0]}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                
                {selectedDate && (
                  <div>
                    <h4 style={{ color: '#374151', marginBottom: '10px', fontSize: '14px' }}>Horários disponíveis:</h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                      gap: '8px',
                      marginBottom: '20px',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      padding: '10px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}>
                      {timeSlots.map(slot => (
                        <div
                          key={slot}
                          onClick={() => toggleTimeSlot(slot)}
                          style={{
                            padding: '6px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: '500',
                            background: selectedTimes.includes(slot) ? '#667eea' : 'white',
                            color: selectedTimes.includes(slot) ? 'white' : '#374151',
                            borderColor: selectedTimes.includes(slot) ? '#667eea' : '#e5e7eb'
                          }}
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={saveAgenda}
                        style={{
                          flex: '1',
                          padding: '12px',
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        💾 Salvar
                      </button>
                      <button 
                        onClick={() => {
                          const newAgenda = { ...agenda }
                          delete newAgenda[selectedDate]
                          setAgenda(newAgenda)
                          setSelectedTimes([])
                        }}
                        style={{
                          flex: '1',
                          padding: '12px',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Limpar
                      </button>
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
            <h2>📋 Visualizar Agenda</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>Consultas de Hoje</h3>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '15px' }}>
                  {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
                {todayConsultas.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📅</div>
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
                        marginBottom: '8px',
                        borderLeft: '4px solid #3b82f6'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1f2937' }}>{consulta.time}</div>
                          <div style={{ fontSize: '14px', color: '#6b7280' }}>{consulta.patient}</div>
                        </div>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
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
              
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>Selecionar Data</h3>
                <input 
                  type="date" 
                  value={viewDate}
                  onChange={(e) => setViewDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    marginBottom: '15px'
                  }}
                />
                
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '10px' }}>
                  Consultas para {new Date(viewDate).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}:
                </div>
                
                {selectedDateConsultas.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>📭</div>
                    <p>Nenhuma consulta nesta data</p>
                  </div>
                ) : (
                  <div>
                    {selectedDateConsultas.map(consulta => (
                      <div key={consulta.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        background: '#f0f9ff',
                        borderRadius: '6px',
                        marginBottom: '6px',
                        borderLeft: '3px solid #0ea5e9'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '14px' }}>{consulta.time}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{consulta.patient}</div>
                        </div>
                        <span style={{
                          padding: '2px 6px',
                          borderRadius: '8px',
                          fontSize: '10px',
                          fontWeight: '600',
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
            <h2>📄 Consultas Passadas</h2>
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
            <h2>❌ Cancelar Consultas</h2>
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
                        ❌ Cancelar
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
            <h2>🚫 Consultas Canceladas</h2>
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
              <div className="notifications-list">
                <div className="notification-item unread">
                  <div className="notification-icon">👥</div>
                  <div className="notification-content">
                    <h4>Nova consulta agendada</h4>
                    <p>Maria Silva agendou consulta para 15/01 às 14:00</p>
                    <span className="notification-time">Há 1 hora</span>
                  </div>
                </div>
                <div className="notification-item unread">
                  <div className="notification-icon">⚠️</div>
                  <div className="notification-content">
                    <h4>Cancelamento de consulta</h4>
                    <p>João Santos cancelou a consulta de amanhã às 10:00</p>
                    <span className="notification-time">Há 3 horas</span>
                  </div>
                </div>
                <div className="notification-item unread">
                  <div className="notification-content">
                    <h4>Lembrete de agenda</h4>
                    <p>Você tem 5 consultas agendadas para hoje</p>
                    <span className="notification-time">Há 6 horas</span>
                  </div>
                </div>
              </div>
              <div className="notification-actions">
                <button className="primary-btn">Marcar todas como lidas</button>
                <button className="secondary-btn">Configurações</button>
              </div>
            </div>
          </div>
        )
      case 'perfil':
        return (
          <div className="section-content">
            <h2>👤 Meu Perfil</h2>
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
                      <span>Dr. João Santos Silva</span>
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
                      <span>dr.joao@adcpsicologia.com</span>
                    </div>
                    <div className="detail-item">
                      <label>Telefone</label>
                      <span>(11) 98888-8888</span>
                    </div>
                    <div className="detail-item">
                      <label>Formação</label>
                      <span>Psicologia - USP (2018)</span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Configurações de Atendimento</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Valor da Consulta</label>
                      <span>R$ 150,00</span>
                    </div>
                    <div className="detail-item">
                      <label>Duração da Sessão</label>
                      <span>50 minutos</span>
                    </div>
                    <div className="detail-item">
                      <label>Atendimento Online</label>
                      <span>Ativo</span>
                    </div>
                    <div className="detail-item">
                      <label>Atendimento Presencial</label>
                      <span>Ativo</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="profile-actions">
                <button className="primary-btn">Editar Perfil</button>
                <button className="secondary-btn">Alterar Senha</button>
                <button className="secondary-btn">Configurações de Atendimento</button>
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