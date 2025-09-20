import { Link } from 'react-router-dom'
import logo from "../../assets/logo.jpeg";


const Menu = () => {
  return (
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
    </div>
  )
}

export default Menu
