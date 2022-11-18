
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Keranjang from '../Pages/Image/Keranjang.png'
import Zayn from '../Pages/Image/Zayn.png' 
import Dropdown from 'react-bootstrap/Dropdown';
import User from '../Pages/Image/user.png';
import Logout from '../Pages/Image/logout.png';
import {useNavigate} from 'react-router-dom';
import AP from '../Pages/Image/AP.png'
import { UserContext } from './Context/userContext';
import { ProfileContext } from './Context/profileContext';
import {useMutation, useQuery} from 'react-query'
import {API, setAuthToken} from '../config/api'
import {Alert} from 'react-bootstrap'
import BlankProfile from '../Pages/Image/blankProfile.jpg'




function NavBefore(props) {

  // const [dataCard] = useContext(CardContext)
  const [state, dispatch] = useContext(UserContext)

  const navigate = useNavigate();

  const handleHome = (e) => {
    e.preventDefault()
    navigate("/")
  } 

  return (
    <div>
        <div className='bg-warning'>
        <Navbar  expand="lg">
        <Container xxl>
        <Navbar.Brand href="/" onClick={handleHome}><img style={{maxHeight: "50px"}} src="https://www.5ways.com.au/Themes/BPDTHEME01/theme-client-updates/img/logos/logo-footer.png" alt=""/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>

          </Nav>
          { state.user.role == "Seller" ?
            <AdminPage/> : 
            state.user.role == "Buyer" ?
            <PrivatePage/>
              : <GuestPage />
              }  
              
            
        </Navbar.Collapse>
        </Container>
        </Navbar>
    
        </div>
        
      
    </div>
        
        
    
  )
}

export function PrivatePage(props) {
  const [state, dispatch] = useContext(UserContext)
  const navigate = useNavigate()
  
  const { data: userBuyer } = useQuery("userBuyerCache", async () => {
      const response = await API.get("/users");
      return response.data.data;
    });

    const LogoutUser = () => {
      console.log(state)
      dispatch({
          type: "LOGOUT"
      })
      navigate("/")
  }

  const [cart, setCart] = useState()
    const getData = async () => {
        try {
            const response = await API.get("/transactions");
            setCart(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
            getData()
    }, [])

    const filter = cart?.filter(p => p.buyer_id == state?.user.id)
    console.log(filter?.length);

  

  const handleCart = (e) => {
      e.preventDefault()
      navigate("/cart/" + state.user.id)
  }

    return (
      <div className='d-flex'>
            <div className='container pt-3'>
            <button href='' onClick={handleCart} className='btn'>
              <div>
                    <span className="position-absolute translate-middle p-2 rounded-circle">
                    <span className='bg-danger rounded-circle text-white px-2  ' style={{paddingRight:"3px", paddingLeft:"3px"}}></span>
                    </span> 
                    <img style={{cursor:"pointer", height:"25px"}} src={Keranjang} alt=""/>
                  </div>                 
            </button>
                
            </div>
            {userBuyer?.map((item) => (
                  item.id == state.user.id ?
                <Dropdown>
                <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                 <div>
                   <img style={{height:"50px" ,width:"50px", borderRadius:"100px", objectFit:"cover"}} 
                   className='rounded-circle' src={item?.image ? BlankProfile : item?.image } alt=""/>
                 </div> 

                </Dropdown.Toggle>
  
                  <Dropdown.Menu>
                  <Dropdown.Item  onClick={() => navigate(`/Profile/${item.id}`)}>
                    <img style={{marginRight:"5px", height:"20px"}} src={User} alt=""/>
                     Profile </Dropdown.Item>
                  <Dropdown.Item  onClick={LogoutUser}>
                    <img style={{marginRight:"8px", height:"20px"}} src={Logout} alt=""/>
                    Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>: null
                  )
                )}
          
      </div>
    );
  }
  
  
 export function GuestPage(props) {

    // const [dataUser, setLogin] = useContext(UserContext)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [showRegis, setShowRegis] = useState(false);
    const handleCloseRegis = () => setShowRegis(false);
    const handleShowRegis = () => setShowRegis(true);

    const [message, setMessage] = useState(null);

    const [state, dispatch] = useContext(UserContext);


    const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      phone:'',
      role:'',
      gender:''
  });


  const { name, email, password, phone, role, gender } = form;

  const navigate = useNavigate()


  const handleOnChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value,
      });
  }

  const handleSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      const data = await API.post("/login", form);

      const alert = <Alert variant="success">Login berhasil!</Alert>;

      setMessage(alert);

      let payload = data.data.data;
      let userCheck = payload.role
      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
      if( userCheck == "Buyer"){
        navigate("/");
      } else {
        navigate("/Profile-Partner/" + payload.id)
      }
      console.log("isi payload", payload);
      console.log("ini data login", data);
    } catch (error) {
      console.log(error);
      const alert = <Alert variant="danger">Email / password salah!</Alert>;

      setMessage(alert);
    }
  });
  

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);

      const alert = (
        <Alert variant="success">Berhasil mendaftarkan akun!</Alert>
      );

      setMessage(alert);

      console.log("ini response register", response);
    } catch (e) {
      console.log(e);
      const alert = (
        <Alert variant="danger">Aduh gagal!</Alert>
      );

      setMessage(alert);
    }
  });
    return (
      <div>
        <Button onClick={handleShow}  variant="dark me-3">Login</Button>
        <Button onClick={handleShowRegis} variant="dark">Register</Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <Modal.Title style={{margin: "auto 200px"}}>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e)=> handleSubmitLogin.mutate(e)}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={handleOnChange}
                name='email'
                type="email"
                value={form.email}
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginPass">
              <Form.Label>Password</Form.Label>
              <Form.Control
              onChange={handleOnChange}
              name='password'
              value={form.password}
                type="password"
                autoFocus
              />
            </Form.Group>
            <button type='submit' className="w-100 py-2 bg-dark text-white rounded">Login</button>
            <p className="text-center pt-2 text-black-50">Don't have an account ? Klik <a className="text-decoration-none" href="#" onClick={()=>{handleShowRegis(); handleClose()}}>Here</a> </p>
            
          </Form>
        </Modal.Body>

      </Modal>
      <Modal show={showRegis} onHide={handleCloseRegis}>
        <Modal.Header  closeButton>
          <Modal.Title style={{margin: "auto 180px"}}>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {message && message}
          <Form onSubmit={(e)=> handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" controlId="regisEmail">
              <Form.Control
                type="email"
                name='email'
                value={email}
                onChange={handleOnChange}
                placeholder="Email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="regisPassword">
              <Form.Control
                type="password"
                name='password'
                value={password}
                onChange={handleOnChange}
                placeholder="Password"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="regisName">
              <Form.Control
                type="text"
                name='name'
                value={name}
                onChange={handleOnChange}
                placeholder="Fullname"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="regisGender">
            <Form.Select aria-label="Default select example" onChange={handleOnChange} value={gender} name='gender'>
                <option>Gender</option>
                <option  value="Male">Male</option>
                <option  value="Female">Female</option>
                <option  value="Another">Another</option>
            </Form.Select>
            </Form.Group>
        
            <Form.Group className="mb-3" controlId="regisPhone">
              <Form.Control
                type="number"
                name='phone'
                value={phone}
                onChange={handleOnChange}
                placeholder="Phone Number"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="registype">
            <Form.Select aria-label="Default select example" onChange={handleOnChange} value={role} name='role'>
                <option>Type User</option>
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
            </Form.Select>
            </Form.Group>

            <button className="w-100 py-2 bg-dark text-white rounded">Register</button>
            <p className="text-center pt-2 text-black-50">Already Have an Account ? Klik <a className="text-decoration-none" href="#" onClick={()=>{ handleShow(); handleCloseRegis()}}>Here</a> </p>

            
          </Form>
        </Modal.Body>

      </Modal>
      </div>
    );
  }

  function AdminPage(props) {
    const [state, dispatch] = useContext(UserContext)
    let { data: userSeller } = useQuery("userSellerCache", async () => {
      const response = await API.get("/users");
      return response.data.data;
    });


    let navigate = useNavigate()

    const LogoutAdmin = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/")
    }

    const handleAdd = (e) => {
      e.preventDefault()
      navigate("/Add-Product")
    }
      return (
        <div className='d-flex'>
                {userSeller?.map((item) => (
                  item.id == state.user.id ?
              <Dropdown key={item.id}>
                <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                <div>
                   <img style={{height:"50px" ,width:"50px", borderRadius:"100px", objectFit:"cover"}} 
                   className='rounded-circle' src={item?.image ? BlankProfile: item?.image}/>
                   </div>
                </Dropdown.Toggle>
                
                  <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate(`/Profile-Partner/${item.id}`)}><img style={{marginRight:"5px", height:"20px"}} src={User} alt=""/> Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleAdd}><img style={{marginRight:"5px", height:"20px"}} src={AP} alt=""/> Add Product</Dropdown.Item>
                  <Dropdown.Item onClick={LogoutAdmin}><img style={{marginRight:"8px", height:"20px"}} src={Logout} alt=""/>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> : null
                  )
                )}
          
        </div>
      );
    }
  


export default NavBefore