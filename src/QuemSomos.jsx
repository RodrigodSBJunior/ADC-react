import './QuemSomos.css'
import Menu from './Menu'
import Footer from './pages/menu/Footer'
import psicologaImg from './assets/psicologa.png'
import logo from './assets/ChatGPT Image 8 de out. de 2025, 09_06_54.png'

const QuemSomos = () => {
  return (
    <>
      <Menu />
      <main className="sobre-container">
        <section className="hero-sobre">
          <h1>Sobre a ADC Psicologia</h1>
          <p className="subtitulo">Cuidando da sua saúde mental com excelência e humanização</p>
        </section>

        <section className="nossa-historia">
          <div className="content">
            <h2>Nossa História</h2>
            <p>A ADC Psicologia nasceu da paixão por transformar vidas através do cuidado psicológico de qualidade. Fundada com o propósito de oferecer atendimento humanizado e acessível, nossa clínica se tornou referência em saúde mental na região.</p>
            <p>Acreditamos que cada pessoa é única e merece um atendimento personalizado, respeitando sua individualidade, valores e história de vida.</p>
          </div>
        </section>

        <section className="missao-visao">
          <div className="cards-container">
            <div className="card">
              <h3>Missão</h3>
              <p>Promover o bem-estar psicológico através de atendimento humanizado, ético e de qualidade, contribuindo para o desenvolvimento pessoal e a qualidade de vida dos nossos pacientes.</p>
            </div>
            <div className="card">
              <h3>Visão</h3>
              <p>Ser reconhecida como referência em atendimento psicológico, inovando constantemente em práticas terapêuticas e tecnologia para melhor servir nossa comunidade.</p>
            </div>
            <div className="card">
              <h3>Valores</h3>
              <ul>
                <li>Ética e confidencialidade</li>
                <li>Humanização no atendimento</li>
                <li>Excelência profissional</li>
                <li>Respeito à diversidade</li>
                <li>Compromisso com resultados</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="nossa-equipe">
          <h2>Nossa Equipe</h2>
          <div className="equipe-container">
            <div className="psicologa-card">
              <div className="foto-psicologa">
                <img src={psicologaImg} alt="Dra. Mayra Santos" />
              </div>
              <div className="info-psicologa">
                <h3>Dra. Mayra Santos</h3>
                <p className="crp">CRP: 385097-M</p>
                <p className="especialidade">Psicóloga Clínica</p>
                <p className="descricao">Especialista em Terapia Cognitivo-Comportamental com mais de 8 anos de experiência. Atua no tratamento de ansiedade, depressão, transtornos do humor e desenvolvimento pessoal.</p>
                <div className="formacao">
                  <h4>Formação:</h4>
                  <ul>
                    <li>Graduação em Psicologia - USP</li>
                    <li>Especialização em TCC - PUC-SP</li>
                    <li>Mestrado em Psicologia Clínica</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="diferenciais">
          <h2>Nossos Diferenciais</h2>
          <div className="diferenciais-grid">
            <div className="diferencial">
              <div className="icon-container">
                <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </div>
              <h3>Ambiente Acolhedor</h3>
              <p>Espaço pensado para proporcionar conforto e tranquilidade durante as consultas.</p>
            </div>
            <div className="diferencial">
              <div className="icon-container">
                <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
                </svg>
              </div>
              <h3>Atendimento Online</h3>
              <p>Flexibilidade para atendimento presencial ou online, conforme sua necessidade.</p>
            </div>
            <div className="diferencial">
              <div className="icon-container">
                <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
              </div>
              <h3>Agendamento Fácil</h3>
              <p>Sistema online prático para agendar suas consultas com rapidez e segurança.</p>
            </div>
            <div className="diferencial">
              <div className="icon-container">
                <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7.5h-1c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5H19v6h1zm-12.5-2.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S6 17.17 6 18s.67 1.5 1.5 1.5zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                </svg>
              </div>
              <h3>Atendimento Humanizado</h3>
              <p>Cuidado personalizado respeitando a individualidade de cada paciente.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default QuemSomos