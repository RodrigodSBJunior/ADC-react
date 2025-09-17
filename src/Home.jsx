import { Link } from "react-router-dom";
import logo from "./assets/logo.jpeg";
import play from "./assets/play.jpeg";
import blz from "./assets/blz.jpeg";
import mao from "./assets/mao.jpeg";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-wrapper">
        <div id="header">
          <div id="menu">
            <img src={logo} alt="Logo da clínica" />
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/quem-somos">Quem Somos</Link>
              </li>
              <li>
                <Link to="/contato">Contato</Link>
              </li>
            </ul>
            <Link to="/entrar">
              <button className="btn-entrar">Entrar</button>
            </Link>
          </div>
        </div>

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
      </div>
    </>
  );
};
export default Home;
