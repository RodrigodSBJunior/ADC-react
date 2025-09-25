import Menu from './Menu';
import { useNavigate } from 'react-router-dom';

const Agendar = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <Menu />
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{ 
                        marginBottom: '1rem', 
                        padding: '0.5rem 1rem', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer' 
                    }}
                >
                    ← Voltar
                </button>
                <h1>Agendar Consulta</h1>
                <p>Página de agendamento em desenvolvimento...</p>
            </div>
        </>
    );
};

export default Agendar;