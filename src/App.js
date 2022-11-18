
import Home from './Pages/Home';
import NavBefore from './Component/NavBefore';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './Pages/Menu';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Cart from './Pages/Cart';
import Profile from './Pages/Profile';
import EditProfileU from './Pages/EditProfileU';
import AddProduk from './Pages/addProduk';
import ProfileParner from './Pages/ProfilePartner';
import EditProfileP from './Pages/EditProfileP';
import IncomeTransaction from './Pages/IncomeTransaction';
import { useContext, useState, useEffect } from 'react';
import { API, setAuthToken } from './config/api';
import { UserContext } from './Component/Context/userContext';
import { CartContext } from './Component/Context/cartContext';

function App() {

  
    const [cartLength, setCartLength] = useState(0);
    const [state, dispatch] = useContext(UserContext)
  
    useEffect(() => {

      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
  }, [state]);
  
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      let payload = response.data.data;
      payload.token = localStorage.token;
  
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className='bg'>
      <CartContext.Provider value={{ cartLength, setCartLength }}>
      <>
        <NavBefore />
        <Routes> 
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/Menu/:id' element={<Menu  />}/>
          <Route exact path='/Cart/:id' element={<Cart />}/>
          <Route exact path='/Profile/:id' element={<Profile />}/>
          <Route exact path='/user-edit/:id' element={<EditProfileU />}/>
          <Route exact path='/Add-Product' element={<AddProduk />}/>
          <Route exact path='/Profile-Partner/:id' element={<ProfileParner />}/>
          <Route exact path='/partner-edit/:id' element={<EditProfileP />}/>
          <Route exact path='/income-partner' element={<IncomeTransaction />}/>
          
        </Routes>
      </>
      </CartContext.Provider>
 
    </div>
  );
}

export default App;
