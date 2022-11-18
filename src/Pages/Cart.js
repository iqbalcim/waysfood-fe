import React, { useContext, useEffect, useState } from 'react'
import Loc from './Image/map.png'
import Bin from './Image/bin.png'
import Modal from 'react-bootstrap/Modal';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { API } from '../config/api';
import { useMutation, useQuery } from 'react-query';
import EmptyCart from './Image/emptyCart.png'
import toRupiah from '@develoka/angka-rupiah-js';
import { UserContext } from '../Component/Context/userContext';
import Map from '../Component/MapCart';
import { CartContext } from '../Component/Context/cartContext';



function Cart() {
    const navigate = useNavigate()
    const [state] = useContext(UserContext)

    const [show, setShow] = useState(false);
    const { cartLength, setCartLength } = useContext(CartContext);
    // add to cart
    const addToCartHandler = async (productId, productPrice) => {
        try {
            const response = await API.post(`/cart/add/${productId}`, {
                price: productPrice,
            });
            console.log("test", response.data.data);
            refetch();
            const getCart = await API.get("/carts");
            setCartLength(getCart.data.data.length);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCartHandler = async (productId) => {
        try {
            const response = await API.patch(`/cart/update/${productId}`);
            if (response.data.data.qty === 0) {
                const response = await API.delete(`/cart/delete/${productId}`);
                setCartLength((prev) => prev - 1);
            }
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const { data: cartData, refetch } = useQuery("cartCache", async () => {
        try {
            const response = await API.get("/carts");
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    });

    // calculate
    const allCartPrice = cartData?.map((item) => item.product.price * item.qty);
    const subTotal = allCartPrice?.reduce((a, b) => a + b, 0);
    console.log(subTotal);

    useEffect(() => {
        refetch();
    }, []);

    const qty = cartData?.map(p => p.qty).reduce((a, b) => a += b, 0)


    return (
        <div style={{ backgroundColor: "#E5E5E5", height: "100vh" }}>
            {cartData?.length ?
                <div className='container p-5'>
                    <div>
                        <h2 className='mb-5'>Geprek Ways</h2>
                        <p className='fs-4'>Delivery Location</p>
                        <div className='d-flex align-items-center'>
                            <input className='rounded me-auto' style={{ padding: "7px", width: "80%" }} type="text"></input>
                            <a onClick={() => setShow(true)} className=' py-2 bg-dark text-white text-decoration-none rounded px-4'>Select on Map <img className='ms-2' src={Loc} /></a>
                        </div>
                        <div>
                            <p className='fs-4 mt-3 container'>Review Your Order</p>
                            <div className='d-flex w-100 container'>
                                {/* for map */}
                                <div style={{ width: "60%", maxHeight: "200px" }} className='container overflow-auto'>
                                    <hr style={{ width: "100%", height: "2px", backgroundColor: "black", opacity: "100%" }} />
                                    {cartData?.map((item) => (
                                        <div >

                                            <div className='mt-4'>
                                                <div key={item.id} className='d-flex'>
                                                    <img className='w-25 me-3' src={item.product.image} alt='' />
                                                    <div className='d-flex w-100 mt-3'>
                                                        <div className='me-auto'>
                                                            <div>
                                                                <p>{item.product.name}</p>
                                                            </div>
                                                            <div className='d-flex' style={{ height: "30px", boxSizing: "border-box" }}>
                                                                <button className='me-2 btn py-0' onClick={() => {
                                                                    deleteCartHandler(item.product.id);
                                                                }}>-</button>
                                                                <p className='me-2 py-1'>{item.qty}</p>
                                                                <button className='me-2 btn py-0' onClick={() => {
                                                                    addToCartHandler(
                                                                        item.product.id,
                                                                        item.product.price
                                                                    );
                                                                }} >+</button>
                                                            </div>

                                                        </div>
                                                        <div>
                                                            <div className='container' >
                                                                <p>{toRupiah((item.price), { dot: '.', floatingPoint: 0 })}  </p>
                                                            </div>
                                                            <div className='ps-1'>
                                                                <img className='ms-5' onClick={async () => {
                                                                    const response = await API.delete(
                                                                        `/cart/delete/${item.product.id}`
                                                                    );
                                                                    refetch();
                                                                    setCartLength((prev) => prev - 1);
                                                                }} src={Bin} alt="a" />
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                                <hr style={{ width: "100%", height: "2px", backgroundColor: "black", opacity: "100%", marginTop: "39px" }} />
                                            </div>
                                        </div>

                                    ))}



                                </div>

                                                                
                                <div className='col-md-6' style={{ width: "40%", overflow: "hidden" }}>
                                    <hr className=' ms-3 me-3' style={{ width: "100%", height: "2px", backgroundColor: "black", opacity: "100%" }} />
                                    <div>
                                        <div className='d-flex ms-3'>
                                            <p className='me-auto'>Subtotal</p>
                                            <p>{toRupiah(subTotal)}</p>
                                        </div>
                                        <div className='d-flex ms-3'>
                                            <p className='me-auto'>Qty</p>
                                            <p>{qty}</p>
                                        </div>
                                        <div className='d-flex ms-3'>
                                            <p className='me-auto'>Ongkir</p>
                                            <p>Rp. 10.000</p>
                                        </div>

                                        <hr className=' ms-3 me-3 ' style={{ width: "100%", height: "2px", backgroundColor: "black", opacity: "100%" }} />
                                        <div className='d-flex ms-3'>
                                            <p className='me-auto'>Total :</p>
                                            <p>{toRupiah(subTotal + 10000)}</p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className='w-100 text-end mt-4 '>
                                <a className=' bg-dark text-white w-100 text-decoration-none rounded' style={{ padding: "10px 100px " }}> Order</a>
                            </div>
                        </div>

                    </div>

                </div> :
                <div className='container' style={{ height: "80vh" }}>
                    <div className=' container mx-auto my-auto text-center' style={{ width: "30%" }}>
                        <img src={EmptyCart} className="w-100" alt="" />
                        <h4>Your Cart Is Empty</h4>
                        <p className='mb-0' style={{ fontSize: "12px" }}>You have no items in your shopping cart.</p>
                        <p className='m-0 mb-3' style={{ fontSize: "12px" }}>Let's go buy something!</p>
                        <button href="#" className='btn bg-danger text-white px-5' onClick={() => navigate('/')}>Shopping Now</button>
                    </div>
                </div>}


            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Map />
                </Modal.Body>
            </Modal>

        </div>


    )
}


export default Cart