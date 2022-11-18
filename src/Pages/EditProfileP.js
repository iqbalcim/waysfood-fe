import React, { useContext, useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileContext } from '../Component/Context/profileContext';
import Clip from './Image/clip.png'
import Loc from './Image/map.png'
import Modal from 'react-bootstrap/Modal'
import { useMutation, useQuery } from 'react-query';
import { API } from '../config/api';
import Map from '../Component/MapProfile';


function EditProfileU() {
    const { id } = useParams()
    const [preview, setPreview] = useState(null)
    const [show, setShow] = useState(false);
    const [latlng, setlatlng] = useState()
    const handleShow = () => setShow(true);

    let { data: editP } = useQuery("editPCache", async () => {
        const response = await API.get("/user/" + id);
        return response.data.data;
    });

    const [form, setForm] = useState({
        name: '',
        email: '',
        image: null,
        phone: 0,
        location:'',
    })


    useEffect(() => {
        if (editP) {
            setPreview(editP.image);
            setForm({
                ...form,
                name: editP.name,
                email: editP.email,
                phone: editP.phone,
                location: editP.location
            });
        }

    }, [editP]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        })

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }

    const navigate = useNavigate()

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            if (form.image) {
                formData.set("image", form?.image[0], form?.image[0]?.name)
            } else if (preview) {
                formData.set("image", preview)
            }
            formData.set("name", form.name);
            formData.set("email", form.email);
            formData.set("phone", form.phone);
            formData.set("location", latlng);

            const response = await API.patch("/user/" + editP.id, formData);

            navigate("/Profile-Partner/" + id);
        } catch (error) {
            console.log(error);
        }
    });
    return (
        <div className='container-xxl' style={{ backgroundColor: "#E5E5E5", height: "100vh" }}>
            <div className='container p-5'>
                <h3 className='mb-5'>Edit Profile Partner</h3>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    {preview && (
                        <div>
                            <img
                                src={preview}
                                style={{
                                    maxWidth: "150px",
                                    maxHeight: "150px",
                                    objectFit: "cover",
                                }}
                                alt="preview"
                            />
                        </div>
                    )}
                    <Form.Group className="mb-3 d-flex" >
                        <Form.Control name='name' value={form?.name} onChange={handleChange} className='border border-success border-3 border-opacity-50' style={{ width: "80%", marginRight: "5px" }} type="text" placeholder="Fullname" />
                        <div className='bg-white rounded px-3 cursor-pointer border border-success border-3 border-opacity-50' style={{ width: "20%" }}>
                            <label className='d-flex pt-2 cursor-pointer' for="file"><p className='mt-1 me-auto'>Choose File </p> <img style={{ height: "30px" }} src={Clip} alt='' />
                                <Form.Control id='file' onChange={handleChange} name='image' style={{ width: "20%" }} type="file" hidden />
                            </label>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3 " >
                        <Form.Control name='email' value={form?.email} onChange={handleChange} style={{ paddingTop: "11px", paddingBottom: "11px" }} className='border border-success border-3 border-opacity-50' type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control name='phone' value={form?.phone} onChange={handleChange} style={{ paddingTop: "11px", paddingBottom: "11px" }} className='border border-success border-3 border-opacity-50' type="number" placeholder="Phone" />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex" >
                        <Form.Control name='location' className='border border-success border-3 border-opacity-50' style={{ width: "80%", marginRight: "5px" }} value={form.location ? form.location : latlng} type="text" placeholder="Location" />
                        <button onClick={(e) => { handleShow(); e.preventDefault() }} style={{ width: "20%", paddingTop: "12px", paddingBottom: "12px" }} className=' bg-dark text-white text-decoration-none text-center rounded px-4'>Select on Map <img className='ms-2' src={Loc} /></button>
                    </Form.Group>

                    <button style={{ width: "30%", paddingTop: "12px", paddingBottom: "12px" }} className=' mt-5 float-end bg-dark text-white text-decoration-none text-center rounded px-4'>Save</button>

                </Form>
            </div>
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Map set={setlatlng} />
                </Modal.Body>
            </Modal>
        </div>
    )
}


export default EditProfileU