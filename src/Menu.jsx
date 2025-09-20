import './Menu.css'

const Menu = () => {
  return (
    <header id="header">
      <nav id="menu">
        <img src="/logo.png" alt="Logo" />
        <ul>
          <li><a href="/">Home</a></li>
          <li>
            <a href="/quem-somos">Quem Somos</a>
            <div className="dropdown">
              <a href="/historia">História</a>
              <a href="/missao">Missão</a>
              <a href="/equipe">Equipe</a>
            </div>
          </li>
          <li>
            <a href="/servicos">Serviços</a>
            <div className="dropdown">
              <a href="/consultoria">Consultoria</a>
              <a href="/auditoria">Auditoria</a>
              <a href="/treinamento">Treinamento</a>
            </div>
          </li>
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