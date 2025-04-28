import logo from './logo.svg';
import './App.css';
import { Provider, useDispatch, useSelector } from "react-redux"
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store'
import { Categorylist } from './components/categorylist';
import { Routing } from './components/routing';
import { Nav } from './components/nav';
import { Gamelist } from './components/gamelist';
import { Cart } from './components/cart';
import { Payment } from './components/payment';


function App() {
  // 
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav></Nav>
        <Routing></Routing>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
