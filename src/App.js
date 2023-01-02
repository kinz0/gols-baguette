/* used in App.js */
// basics
import './App.css';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route} from 'react-router-dom'
// components
import Header from './components/Header';
import Footer from './components/Footer';
// screens
import Homescreen from './screens/Homescreen';
import UserScannerscreen from './screens/UserScannerscreen';
import OrderScannerscreen from './screens/OrderScannerscreen';
import RedisOrderScannerscreen from './screens/RedisOrderScannerscreen';
import Cartscreen from './screens/Cartscreen';
import Confirmationscreen from './screens/Confirmationscreen';
import aboutUS from './screens/Aboutus';



function App() {
  return (
    <Router>
      <Header />

      <main>
        <Container>
          <Route path='/' component={Homescreen} exact />
          <Route path='/userscanner' component={UserScannerscreen} />
          <Route path='/order/:hash' component={RedisOrderScannerscreen} />
          <Route path='/:user/cart/:product?' component={Cartscreen} />
          <Route path='/confirmation/:hash/:cartid?' component={Confirmationscreen} />
          <Route path='/aboutus' component={aboutUS} />
        </Container>        
      </main>

      <Footer />
              

    </Router>
  );
}

export default App;
