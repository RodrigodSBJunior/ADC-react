import logo from "../../assets/logo.jpeg";
import '../Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="ADC Psicologia" width="100" />
        </div>
        <div className="footer-info">
          <p>&copy; 2025 ADC Psicologia</p>
          <p>ITB Brasilio Flores (Belval)</p>
          <p>Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;