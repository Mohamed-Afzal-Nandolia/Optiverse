import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import SessionProvider from './component/SessionProviderComponent/SessionProvider';
import Login from './components/LoginComponent/Login.jsx';

function App() {
  return (
    <div>
      {/* <SessionProvider> */}
        <BrowserRouter>
        {/* <NavBar/> */}
        {/* <NavBar currentPage="login" /> */}
          <Routes>
              {/* //http://localhost:8080 agar url /home-page hai to ye component hit hoga
              <Route path='/home-page' element = { <HomePage /> }></Route> */}
              //http://localhost:8080 agar url /login to ye component hit hoga
              <Route path='/login' element={ <Login/> }></Route>
              {/* //http://localhost:8080 agar url / to ye component hit hoga
              <Route path='/' element={ <LoginPage/> }></Route>
              //http://localhost:8080 agar url /register to ye component hit hoga
              <Route path='/register' element={ <RegisterPage/> }></Route>
              //http://localhost:8080 agar url /fp to ye component hit hoga
              <Route path='/fp' element={ <ForgotPassword/> }></Route> */}
          </Routes>
        </BrowserRouter>
      {/* </SessionProvider> */}
    </div>
  );
}

export default App;