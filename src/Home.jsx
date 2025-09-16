import {Link} from 'react-router-dom'
import logo from './assets/logo.jpeg'
import './Home.css'

const Home = () => {

    return(
    <>
    
    <div id="header">
        <div id="menu">
            <img src={logo} alt="Logo da clínica" />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/quem-somos">Quem Somos</Link></li>
                <li><Link to="/contato">Contato</Link></li>
            </ul>
            <Link to = "/entrar"><button className ="btn-entrar" >Entrar</button></Link>
        </div>
    </div>

    <div id="part2">
        <div id="textprinc">
            <h1>Sua saúde em primeiro lugar</h1>
            <p>Agende sua consulta de forma rápida e prática com a gente!</p>
        </div>

        <div className="btn-container">
            <Link to = "/agendar"><button className ="btn-contrate" >Agendar Consulta</button></Link>
        </div>
    </div>

    </>
    )

}
export default Home;