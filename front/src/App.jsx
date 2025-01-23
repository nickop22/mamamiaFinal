import Navegacion from './componentes/Navegacion.jsx'
 import Login from './pages/Login.jsx'
 import Registro from './pages/Registro.jsx'
import './App.css'
import { useState } from 'react';
import { Route, Routes,Navigate } from "react-router-dom";
import Cart from './pages/Cart.jsx'
import Pizza from './pages/Pizza.jsx'
import Home from './pages/Home.jsx'
import Footer from './componentes/Footer.jsx'
import Profile from './componentes/Profile.jsx';
import NotFound from './componentes/NotFound.jsx';
import { UserContext } from './context/UserContext.jsx';
import { useContext } from'react';

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
<>
        <Navegacion />
        <Routes>
          <Route  path="/" element={ <Home />}/>
          <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Registro />} />
          <Route path="/login" element={!isLoggedIn ? <Login/> :<Navigate to="/"/>}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/pizza/:id" element={<Pizza />}/>
          <Route path="/profile" element={!isLoggedIn ? <Navigate to="/login" /> : <Profile />}/>
          <Route path="/404" element={<NotFound />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      <Footer fixed="bottom" />
    </>
  )
}

export default App
