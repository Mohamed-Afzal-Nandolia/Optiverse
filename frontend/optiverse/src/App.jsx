import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from './components/LoginComponent/Login.jsx';
// import Register from './components/RegisterComponent/Register.jsx';
import Auth from './components/Auth Component/Auth.jsx';
import Homepage from './components/Homepage Component/Homepage.jsx';
import PrivateRoute from './components/Auth Component/PrivateRoute.jsx';
import NotFound from './components/NotFound Component/NotFound.jsx';
import MyProfile from './components/Homepage Component/MyProfile Component/MyProfile.jsx';

function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
              <Route path="*" element={<NotFound />} /> 
              <Route path='/' element={ <Auth/> }> </Route>
              <Route
                path="/homepage"
                element={
                  <PrivateRoute>
                    <Homepage />
                  </PrivateRoute>
                }
              />
              {/* <Route path="/myprofile" element={<MyProfile />} /> */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;