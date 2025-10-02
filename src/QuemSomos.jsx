import './QuemSomos.css'
import Menu from './Menu'
import Footer from './pages/Footer'
import psicologaImg from './assets/psicologa.png'
import clinicaImg from './assets/clinica.png'
import { useNavigate } from 'react-router-dom'

const QuemSomos = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Menu />
      <div className="sobre-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1>✨ Quem Somos</h1>
            <p className="hero-subtitle">Conectando você aos melhores cuidados em saúde mental</p>
          </div>
          <div className="hero-image">
            <img src={psicologaImg} alt="Psicóloga" />
          </div>
        </div>

        <div className="sobre-content">
          <div className="intro-section">
            <div className="intro-text">
              <h2>🚀 ADC - Sua Plataforma de Bem-Estar</h2>
              <p>
                Somos a <strong>ADC</strong>, uma plataforma inovadora que revoluciona o agendamento 
                de consultas psicológicas, conectando pacientes e profissionais de forma inteligente.
              </p>
            </div>
            <div className="intro-image">
              <img src={clinicaImg} alt="Clínica" />
            </div>
          </div>

          <div className="cards-section">
            <div className="card">
              <div className="card-icon">🎯</div>
              <h3>Nossa Missão</h3>
              <p>Democratizar o acesso à saúde mental com tecnologia de ponta e atendimento humanizado.</p>
            </div>

            <div className="card">
              <div className="card-icon">💡</div>
              <h3>Nossa Visão</h3>
              <p>Ser referência em cuidados psicológicos digitais, transformando vidas através da inovação.</p>
            </div>

            <div className="card">
              <div className="card-icon">❤️</div>
              <h3>Nossos Valores</h3>
              <p>Empatia, qualidade, acessibilidade e compromisso com o bem-estar de cada pessoa.</p>
            </div>
          </div>

          <div className="services-section">
            <h2>🌟 O que Oferecemos</h2>
            <div className="services-grid">
              <div className="service-item">
                <span className="service-icon">📅</span>
                <span>Agendamento Inteligente</span>
              </div>
              <div className="service-item">
                <span className="service-icon">👨⚕️</span>
                <span>Profissionais Certificados</span>
              </div>
              <div className="service-item">
                <span className="service-icon">💻</span>
                <span>Consultas Online & Presenciais</span>
              </div>
              <div className="service-item">
                <span className="service-icon">🔒</span>
                <span>Segurança Total</span>
              </div>
              <div className="service-item">
                <span className="service-icon">📱</span>
                <span>App Mobile</span>
              </div>
              <div className="service-item">
                <span className="service-icon">🤝</span>
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <div className="stat">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Pacientes Atendidos</div>
            </div>
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Psicólogos Parceiros</div>
            </div>
            <div className="stat">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfação</div>
            </div>
          </div>

          <div className="cta-section">
            <h3>🌈 Transforme sua vida hoje!</h3>
            <p>Junte-se a milhares de pessoas que já cuidam da saúde mental conosco</p>
            <button className="cta-btn" onClick={() => navigate('/cadastro')}>
              ✨ Começar Jornada
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default QuemSomos