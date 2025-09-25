<<<<<<< HEAD
import './QuemSomos.css'
import Menu from './Menu'
import psicologaImg from './assets/psicologa.png'
import clinicaImg from './assets/clinica.png'
=======
import './QuemSomos.css';

const QuemSomos = () => {
    return (
        <div className="quem-somos">
            <h1>Quem Somos</h1>
            <div className="container">
                <p>Somos uma plataforma inovadora criada para facilitar o agendamento de consultas psicológicas, oferecendo uma solução simples, rápida e acessível para quem busca cuidados com a saúde mental. Nosso objetivo é transformar a maneira como pacientes e psicólogos agendam e gerenciam consultas, promovendo uma experiência mais fluida e organizada para todos.</p>

                <p>Com a nossa plataforma, pacientes podem agendar suas sessões em poucos cliques, sem a necessidade de trocas constantes de mensagens ou telefonemas. Já os psicólogos encontram uma maneira prática de gerenciar suas agendas de forma eficiente, otimizando seu tempo e atendendo mais pessoas com maior organização.</p>

                <p>Nosso projeto nasce da necessidade de resolver um problema recorrente: a dificuldade de acesso a serviços psicológicos, tanto na rede pública quanto privada. A escassez de horários, a sobrecarga de profissionais e os processos burocráticos no agendamento frequentemente dificultam o atendimento rápido e contínuo, prejudicando a saúde mental de quem precisa. Com a nossa plataforma, buscamos minimizar esses obstáculos, tornando o processo de agendamento mais acessível, rápido e confiável.</p>

                <h2>Tecnologia a favor da saúde mental</h2>
                <p>Utilizamos as mais modernas tecnologias de desenvolvimento web, como HTML, CSS, JavaScript, Node.js e Express, para criar uma plataforma intuitiva e de fácil navegação. O sistema é seguro e eficiente, com um banco de dados robusto (MySQL) que garante a organização e confiabilidade dos agendamentos.</p>

                <h2>Nossa missão</h2>
                <p>Nossa missão é facilitar o acesso ao cuidado psicológico, promovendo a saúde mental de forma mais eficiente e acessível. Ao conectar pacientes e psicólogos de maneira mais organizada e dinâmica, queremos melhorar a qualidade de vida das pessoas e promover a continuidade do tratamento psicológico, essencial para o bem-estar de todos.</p>

                <h2>Por que precisamos dessa plataforma?</h2>
                <p>A escassez de serviços de saúde mental e a alta taxa de evasão no tratamento psicológico são desafios significativos, especialmente na rede pública de saúde. Dados de pesquisas revelam que uma grande parte dos pacientes não comparece à primeira consulta ou desiste do tratamento antes do tempo necessário. Isso se deve, muitas vezes, a falhas de comunicação, esquecimentos ou falta de lembretes eficientes.</p>

                <p>Nosso sistema visa resolver esses problemas, permitindo um agendamento fácil, automação de lembretes, e um gerenciamento de horários que ajuda a reduzir a evasão e aumentar o acesso ao tratamento. A plataforma está especialmente adaptada às necessidades da saúde pública, oferecendo uma solução prática para um serviço mais organizado e acessível.</p>

                <h2>Alinhados aos ODS</h2>
                <p>Acreditamos que, ao facilitar o acesso ao cuidado psicológico, estamos contribuindo para os Objetivos de Desenvolvimento Sustentável da ONU, especialmente o ODS 3, que busca promover a saúde e o bem-estar para todos. A tecnologia tem o poder de transformar o acesso à saúde mental, e estamos aqui para tornar isso uma realidade para mais pessoas.</p>

                <p>Junte-se a nós nessa jornada para um futuro mais saudável e organizado, com um agendamento psicológico simples e eficaz!</p>
            </div>
        </div>
    );
};
>>>>>>> a7f9f88b49f5865d52a55eb20375de425810074f

const QuemSomos = () => {
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
            <button className="cta-btn" onClick={() => window.location.href = '/cadastro'}>
              ✨ Começar Jornada
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuemSomos