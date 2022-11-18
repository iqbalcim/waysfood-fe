import React, { useContext, useEffect, useState } from 'react'
import ZaynKotak from './Image/zaynKotak.png'
import { Link, useParams } from 'react-router-dom'
import { ProfileContext } from '../Component/Context/profileContext'
import { UserContext } from '../Component/Context/userContext'
import { API } from '../config/api'
import BlankProfile from './Image/blankProfile.jpg'


function Profile() {
    const [state] = useContext(UserContext)


    const [user, setUser] = useState()
    const [cart, setCart] = useState()
    const { id } = useParams()
    const getDataProfile = async () => {
        try {
            const response = await API.get("/user/" + id);
            console.log(response);
            setUser(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getDataTransactions = async () => {
        try {
            const response = await API.get("/transactions");
            setCart(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (state.user) {
            getDataProfile()
            getDataTransactions()
        }
    }, [state])


    return (
        <div className='container-xxl' style={{ backgroundColor: "#E5E5E5", height: "100vh" }}>
            <div className='container d-flex p-5'>
                <div className='w-50 px-5'>
                    <h3 className='mb-3'>My Profile</h3>
                    <div className='d-flex'>
                        <img className='me-3 rounded' style={{ height: "150px", width: "122px", overflow: "hidden" }} src={user?.image ? BlankProfile : user?.image  } alt="" />
                        <div style={{ fontSize: "12px" }}>
                            <div className='mb-3'>
                                <p className='m-0 fw-bold'>Fullname</p>
                                <p className='m-0'>{user?.name}</p>
                            </div>
                            <div className='mb-3'>
                                <p className='m-0 fw-bold'>Email</p>
                                <p className='m-0'>{user?.email}</p>
                            </div>
                            <div className='mb-3'>
                                <p className='m-0 fw-bold'>Phone</p>
                                <p className='m-0'>{user?.phone}</p>
                            </div>
                        </div>
                    </div>

                    <Link to={`/user-edit/${id}`}>
                        <button style={{ padding: "2px 30px", fontSize: "12px", borderRadius: "3px" }} className='bg-dark text-white'>Edit Profile</button>
                    </Link>
                </div>
                <div className='w-50 px-5'>
                    <h3 className='mb-3'>History Transaction</h3>
                    <div>
                        {cart?.map((item) => (
                            item.buyer_id == id && (
                                <div className='d-flex w-100 bg-white rounded p-3'>
                                    <div className='me-auto'>
                                        <div>
                                            <p className='m-0 fw-bold'></p>

                                        </div>
                                        <p style={{ fontSize: "13px" }} className='m-0'><strong>Saturday</strong>, 12 March 2021</p>
                                        <p style={{ fontSize: "13px" }} className='m-0 mt-4'>Total : Rp 45.000</p>
                                    </div>

                                    <div className='me-4 '>
                                        <img style={{ width: "60px" }} className='ms-4' src="https://www.5ways.com.au/Themes/BPDTHEME01/theme-client-updates/img/logos/logo-footer.png" alt="" />
                                        <p className='mt-3 m-0 bg-info rounded px-4 py-1 '>{item.status}</p>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>

            </div>

           
        </div>
    )
}

export default Profile