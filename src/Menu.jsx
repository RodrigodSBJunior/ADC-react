import './Menu.css'
import logo from './assets/logo.jpeg'

const Menu = () => {
  return (
    <header id="header">
      <nav id="menu">
        <img src={logo} alt="Logo" />
        <ul>
          <li><a href="/">Início</a></li>
          <li><a href="/quem-somos">Quem Somos</a></li>
          <li><a href="/contato">Contato</a></li>
        </ul>
        <button className="btn-entrar" onClick={() => window.location.href = '/entrar'}>
          Entrar
        </button>
      </nav>
    </header>
  )
}

export default Menu