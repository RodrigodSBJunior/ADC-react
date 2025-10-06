import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home';
import QuemSomos from './QuemSomos';
import Servicos from './Servicos';
import Contato from './Contato';
import Entrar from './Entrar';
import Cadastro from './Cadastro';
import Formularios from './Formularios';
import Agendar from './Agendar';
import AreaProfissional from './AreaProfissional';
import AreaPaciente from './AreaPaciente';
import Cancelar from './Cancelar';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/formularios" element={<Formularios />} />
        <Route path="/agendar" element={<Agendar />} />
        <Route path="/areaprofissional" element={<AreaProfissional />} />
        <Route path="/areapaciente" element={<AreaPaciente />} />
        <Route path="/cancelar" element={<Cancelar />} />
        <Route path="*" element={<div><h1>404 - Página não encontrada</h1></div>} />
      </Routes>
    </Router>
  )
}

export default App;