import './Menu.css'
import logo from './assets/ChatGPT Image 8 de out. de 2025, 09_06_54.png'
import { Link, useNavigate } from 'react-router-dom'

const Menu = () => {
  const navigate = useNavigate();
  
  return (
    <header id="header">
      <nav id="menu">
        <img 
          src={logo} 
          alt="Logo da clínica" 
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/quem-somos">Quem Somos</Link></li>
          <li><Link to="/contato">Contato</Link></li>
        </ul>
        <button className="btn-entrar" onClick={() => navigate('/entrar')}>
          Entrar
        </button>
      </nav>
    </header>
  )
}

export default Menu