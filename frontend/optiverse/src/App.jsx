import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import SessionProvider from './component/SessionProviderComponent/SessionProvider';
import Login from './components/LoginComponent/Login.jsx';
import Register from './components/RegisterComponent/Register.jsx';
import Auth from './components/Auth Component/Auth.jsx';
import Homepage from './components/Homepage Component/Homepage.jsx';
import PrivateRoute from './components/Auth Component/PrivateRoute.jsx';
import NotFound from './components/NotFound Component/NotFound.jsx';

function App() {
  return (
    <div>
      {/* <SessionProvider> */}
        <BrowserRouter>
        {/* <NavBar/> */}
        {/* <NavBar currentPage="login" /> */}
          <Routes>
              <Route path="*" element={<NotFound />} /> 
              {/* <Route path='/login' element={ <Login/> }></Route>
              <Route path='/register' element={ <Register/> }></Route> */}
              <Route path='/' element={ <Auth/> }> </Route>
              {/* <Route path='/homepage' element={ <Homepage/> }></Route> */}
              <Route
                path="/homepage"
                element={
                  <PrivateRoute>
                    <Homepage />
                  </PrivateRoute>
                }
              />
              {/* //http://localhost:8080 agar url / to ye component hit hoga
              <Route path='/homepage' element={ <LoginPage/> }></Route>
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