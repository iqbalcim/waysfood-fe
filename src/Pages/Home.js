import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pizza from './Image/g10.png'
import Geprek from './Image/geprek.png'
import Nasgor from './Image/nasgor.png'
import Kopi from './Image/kopi.png'
import Aygor from './Image/aygor.png'
import User from '../Component/dataDummy/foodMenu'
import { UserContext } from '../Component/Context/userContext';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Container, Alert } from 'react-bootstrap';
import {useMutation,  useQuery} from 'react-query'
import {API} from '../config/api'
import BlankProfile from './Image/blankProfile.jpg'


function Home(props) {
  
    const [resto, setResto] = useState([])
    const [state, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [showRegis, setShowRegis] = useState(false);
    const handleCloseRegis = () => setShowRegis(false);
    const handleShowRegis = () => setShowRegis(true);
    const params = useParams()


    const { data: partner } = useQuery("partnerCache", async () => {
      const response = await API.get("/users");
      const Seller = response.data.data.filter((p)=> p.role == "Seller")
      return Seller;
    });


    const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      phone:'',
      role:'',
      gender:''
  });


  const { name, email, password, phone, role, gender } = form;


  const handleOnChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value,
      });
  }

  const navigate = useNavigate()

  const handleSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      const data = await API.post("/login", form);

      const alert = <Alert variant="success">Login berhasil!</Alert>;

      setMessage(alert);

      let payload = data.data.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });

      navigate("/");

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
        <div className='container-fluid bg-warning pb-5' style={{height:"90vh"}} >
            <div className='container-fluid d-flex justify-content-center align-items-center' style={{height:"75vh"}} >
                <Container className='row'>
                  <div className='col-md-7'>
                      <div className=' d-flex flex-column align-items-end justify-content-center h-100 w-100 '>
                          <div className='mb-4 w-100' style={{fontFamily:"Abhaya Libre ExtraBold"}}>
                              <h2 className='fs-1'>Are You Hungry?</h2>
                              <h2 className='fs-1' >Makanlah Biar Kenyang</h2>
                          </div>
                          <div className='row w-100'>
                              <hr className='mt-2 col-md-5' style={{width:"35%", height:"2px",opacity:"100%",backgroundColor:"black" }} />
                              <p className='col-md-7 ' style={{width:"45%", fontSize:"10px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                          </div>
                      </div>
                  </div>
                  <div className='col-md-5'>
                      <div className='w-100'>
                          <img style={{display:"block"}} className='w-100' src={Pizza} alt="pizza"/>
                      </div>
                  </div>
                </Container>
            </div>
        </div>
        <div style={{backgroundColor:"#E5E5E5"}} >
            <div className='container p-5'>    
                <div className='px-5'>
                    <h2 className='mb-4'>Popular Restaurant</h2>
                        <div >
                            {state.isLogin ?
                            <div className='d-flex overflow-auto' style={{whiteSpace:"nowrap"}}>
                                {partner?.map((e) => {
                                    return(
                                      <Link className='text-decoration-none text-black' to={`/Menu/${e.id}`} >
                                        <div key={e.id} className='d-flex align-item-center bg-white p-2 me-2 rounded ' style={{width:"250px"}}>
                                            <img style={{height:"50px", width:"50px", borderRadius:"100px", objectFit:"cover"}} className='me-3' src={e.image == "http://localhost:5000/uploads/"? BlankProfile: e.image} alt="" />
                                            <h4 style={{cursor:"pointer",}}className='mt-3 me-auto fs-6 text-center'>{e.name}</h4>
                                        </div>
                                        </Link>
                                    )
                                })}
                            </div> : 
                            <div className='d-flex overflow-auto' style={{whiteSpace:"nowrap"}}>
                                {partner?.map((e) => {
                                    return(
                                        <div key={e.id} className='d-flex align-item-center bg-white p-2 me-2 rounded ' style={{width:"250px"}}>
                                            <img style={{height:"50px" , width:"50px", borderRadius:"100px", objectFit:"cover"}} className='me-3' src={e.image == "http://localhost:5000/uploads/"? BlankProfile: e.image} alt="" />
                                            <h4 style={{cursor:"pointer"}} onClick={handleShow} className='mt-3 me-auto fs-6 text-center'>{e.name}</h4>
                                        </div>
                                    )
                                })}
                            </div>
                            
                        } 
                     
                        </div>
                </div>
                <div className='px-5 mt-4'>
                    <h2 className='mb-4'>Restaurant Near You</h2>
                        <div className='d-flex'>
                            <div className='card p-2 me-2' style={{width: "18rem"}}>
                            <img src={Geprek} className='card-img-top' alt="..." />
                                <div className='card-body'>
                                <h5 className='card-title'>Ayam Geprek</h5>
                                <p className='card-text'>0,5 KM</p>
                                </div>
                            </div>
                            <div className='card p-2 me-2' style={{width: "18rem"}}>
                            <img src={Nasgor} className='card-img-top' alt="..." />
                                <div className='card-body'>
                                <h5 className='card-title'>Nasi Goreng Mamang</h5>
                                <p className='card-text'>0,5 KM</p>
                                </div>
                            </div>
                            <div className='card p-2 me-2' style={{width: "18rem"}}>
                            <img src={Aygor} className='card-img-top' alt="..." />
                                <div className='card-body'>
                                <h5 className='card-title'>Ayam Goreng</h5>
                                <p className='card-text'>1000 KM</p>
                                </div>
                            </div>
                            <div className='card p-2' style={{width: "18rem"}}>
                            <img src={Kopi} className='card-img-top' alt="..." />
                                <div className='card-body'>
                                <h5 className='card-title'>Kopi Kenangan</h5>
                                <p className='card-text'>0,1 KM</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
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

    
  )
}

export default Home