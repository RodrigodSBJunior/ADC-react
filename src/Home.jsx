import { Link } from "react-router-dom";
import play from "./assets/play.jpeg";
import blz from "./assets/blz.jpeg";
import mao from "./assets/mao.jpeg";
import Menu from "./Menu";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Menu />
      <div id="part2">
        <div id="textprinc">
          <h1>Sua saúde em primeiro lugar</h1>
          <p>Agende sua consulta de forma rápida e prática com a gente!</p>
        </div>
        <Link to="/agendar">
          <button className="btn-contrate">Agendar Consulta</button>
        </Link>
      </div>

      <div id="part3">
        <div className="containers">
          <img src={play} alt="Profissionais qualificados" />
          <p>
            Profissionais <span>qualificados</span>
          </p>
        </div>
        <div className="containers">
          <img src={blz} alt="Atendimento humanizado" />
          <p>
            Atendimento <span>humanizado</span>
          </p>
        </div>
        <div className="containers">
          <img src={mao} alt="Atendimento online e presencial" />
          <p>
            Atendimento online <span>e presencial</span>
          </p>
        </div>
      </div>

      <div id="part4">
        <h2>Como Funciona</h2>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-circle">1</div>
            <div className="step-content">
              <h3>Cadastre-se</h3>
              <p>Crie sua conta em nossa plataforma de forma rápida e segura</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-circle">2</div>
            <div className="step-content">
              <h3>Escolha o Profissional</h3>
              <p>Selecione o psicólogo que melhor atende suas necessidades</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-circle">3</div>
            <div className="step-content">
              <h3>Agende sua Consulta</h3>
              <p>Marque o horário que funciona melhor para você</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-circle">4</div>
            <div className="step-content">
              <h3>Realize a Consulta</h3>
              <p>Tenha sua sessão online ou presencial com total segurança</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
