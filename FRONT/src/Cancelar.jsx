import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cancelar = () => {
  const [reason, setReason] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  const handleCancel = () => {
    setShowConfirm(true)
  }

  const confirmCancel = () => {
    alert('Consulta cancelada com sucesso!')
    navigate('/areapaciente')
  }

  if (showConfirm) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          textAlign: 'center',
          minWidth: '400px'
        }}>
          <h2 style={{ color: '#1e40af', fontSize: '2rem', marginBottom: '2rem' }}>
            Tem certeza que gostaria de cancelar?
          </h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              onClick={confirmCancel}
              style={{
                background: '#dc2626',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Confirmar
            </button>
            <button 
              onClick={() => setShowConfirm(false)}
              style={{
                background: '#6b7280',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Desfazer
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h2 style={{
          color: '#1e40af',
          fontSize: '2.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
          fontWeight: '700'
        }}>
          Deseja cancelar essa consulta?
        </h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            color: '#374151',
            fontWeight: '600',
            marginBottom: '0.5rem',
            fontSize: '1.1rem'
          }}>
            Motivo:
          </label>
          <input 
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Opcional"
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={handleCancel}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1.1rem',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cancelar