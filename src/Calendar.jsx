import { useState } from 'react'
import './Calendar.css'

const Calendar = ({ onDateSelect }) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setShowCalendar(false)
    if (onDateSelect) {
      onDateSelect(date)
    }
  }

  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Dias vazios no início
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      days.push(
        <div 
          key={day} 
          className="calendar-day"
          onClick={() => handleDateSelect(date)}
        >
          {day}
        </div>
      )
    }

    return days
  }

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  return (
    <div className="calendar-container">
      <div className="calendar-icon" onClick={toggleCalendar}>
        📅
      </div>
      
      {showCalendar && (
        <div className="calendar-popup">
          <div className="calendar-header">
            <h3>{monthNames[currentMonth]} {currentYear}</h3>
            <button className="close-btn" onClick={() => setShowCalendar(false)}>×</button>
          </div>
          
          <div className="calendar-weekdays">
            <div>Dom</div>
            <div>Seg</div>
            <div>Ter</div>
            <div>Qua</div>
            <div>Qui</div>
            <div>Sex</div>
            <div>Sáb</div>
          </div>
          
          <div className="calendar-grid">
            {renderCalendar()}
          </div>
          
          {selectedDate && (
            <div className="selected-date">
              Data selecionada: {new Date(selectedDate).toLocaleDateString('pt-BR')}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Calendar