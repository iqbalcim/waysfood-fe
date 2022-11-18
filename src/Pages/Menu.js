import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom'
import toRupiah from '@develoka/angka-rupiah-js';
import { useMutation, useQuery } from 'react-query'
import { API } from '../config/api'
import MenuModal from '../Component/Modal/MenuModal';
import { Modal } from 'react-bootstrap';
import { UserContext } from '../Component/Context/userContext';
import { CartContext } from '../Component/Context/cartContext';


function Menu(props) {

    const { id } = useParams()

    const [show, setShow] = useState(false);
    const [state] = useContext(UserContext) 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { data: products } = useQuery("productsCache", async () => {
        const response = await API.get("/products");
        return response.data.data;
    });
    const { data: user } = useQuery("userCache", async () => {
        const response = await API.get("/user/" + id);
        return response.data.data;
    });
    
    const [modal, setModal] = useState(null)
    const [confirm, setConfirm] = useState(false)
    
    const navigate = useNavigate();
    
    const handleBack = (e) => {
        e.preventDefault()
        navigate("/")
    }

    
    const [cart, setCart] = useState({
        status: "",
        product_id: 0
    })

    const { cartLength, setCartLength } = useContext(CartContext);

        const addToCartHandler = async (productId, productPrice) => {
            try {
              const response = await API.post(`/cart/add/${productId}`, {
                price: productPrice,
              });
              const getCart = await API.get("/carts");
              setCartLength(getCart.data.data.length);
            } catch (error) {
              console.log(error);
            }
          };
    
    useEffect((e) => {      
        if (confirm)
        setConfirm(false)
    }, [confirm])
    
    return (
        <div style={{ backgroundColor: "#E5E5E5" }}>
            <div className='container p-5'>
                <a onClick={handleBack} style={{ fontSize: "20px", color: "black", textDecoration: "none" }} href=""><img style={{ height: "30px", marginRight: "5px" }} src="https://cdn-icons-png.flaticon.com/512/93/93634.png" alt="" />Back to Home</a>
                <h2 style={{ fontFamily: "Abhaya Libre ExtraBold" }} className=' mt-2'>{user?.name}, Menus</h2>
                <div className='d-flex flex-wrap'>
                    {products?.map((e, index) => (
                        e.user_id == id ?
                            <Card key={index = e.id} className='me-3 mt-3 p-2' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={e.image} />
                                <Card.Body>
                                    <Card.Title >{e.name} </Card.Title>
                                    <Card.Text >
                                        {toRupiah(e.price, { dot: '.', floatingPoint: 0 })}
                                    </Card.Text>
                                    <Button className='w-100' onClick={() => { handleShow(); setModal(e) }} variant="warning">Order</Button>
                                </Card.Body>
                                <MenuModal show={show} handleClose={handleClose} addToCartHandler={addToCartHandler} setConfirm={setConfirm} modal={modal}/>
                            </Card>

                            : null
                    )
                    )}
                </div>
            </div>
        </div>
    )
}

export default Menu