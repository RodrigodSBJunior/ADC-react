import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home';
import QuemSomos from './QuemSomos';
import Serviços from './Serviços';
import Contato from './Contato';
import Entrar from './Entrar';
import Agendar from './Agendar';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/servicos" element={<Serviços />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/agendar" element={<Agendar />} />
      </Routes>
    </Router>
  )
}

export default App;