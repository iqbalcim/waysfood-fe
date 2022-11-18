import React, {useContext, useState} from 'react'
import Clip from './Image/clip.png'
import Form from 'react-bootstrap/Form';
import {useMutation} from 'react-query'
import {API} from '../config/api'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Component/Context/userContext';



function AddProduk() {
    const [state] = useContext(UserContext)
    const navigate = useNavigate()

    const [preview, setPreview] = useState(null)


    const [form, setForm] = useState({
        image: "",
        name: "",
        desc: "",
        price: 0,
        qty: 0,
      });


      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]:
            e.target.type === "file" ? e.target.files : e.target.value,
        });
    
        // Create image url for preview
        if (e.target.type === "file") {
          let url = URL.createObjectURL(e.target.files[0]);
          setPreview(url);
        }
      };

      const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
    
          const formData = new FormData();
          formData.set("image", form.image[0], form.image[0].name);
          formData.set("name", form.name);
          formData.set("price", form.price);
          formData.set("qty", form.qty);
          formData.set("desc", form.desc);
    
          const data = await API.post("/product", formData, {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          });
    
          navigate("/Menu/" + state.user.id);
    
          console.log("ini insert product", data);
        } catch (error) {
          console.log(error);
        }
      });

  return (
    <div style={{backgroundColor:"#E5E5E5", height:"100vh"}}>
        <div className='container p-5'>
            <div className='p-3'>
            <h3 className='mb-4'>Add Product</h3>
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
                    alt={preview}
                  />
                </div>
              )}
                    <Form.Group className="mb-3 d-flex" controlId="exampleForm.ControlInput1">
                        <Form.Control className='border border-success border-3 border-opacity-50' style={{width:"80%", marginRight:"5px"}} type="text" placeholder="Title" name='name' onChange={handleChange}/>
                        <div className='bg-white rounded px-3 cursor-pointer border border-success border-3 border-opacity-50' style={{width:"20%"}}>
                        <label className='d-flex pt-2 cursor-pointer' for="file"><p className='mt-1 me-auto'>Choose File </p> <img  style={{height:"30px"}} src={Clip} alt=''/>
                        <Form.Control name='image' onChange={handleChange} className='cursor-pointer' id='file' style={{width:"20%"}} type="file" placeholder="name@example.com" hidden />
                        </label>    
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1">
                        <Form.Control name="desc" onChange={handleChange} style={{paddingTop:"11px", paddingBottom:"11px"}} className='border border-success border-3 border-opacity-50' as="textarea" placeholder="Description" />
                    </Form.Group>
                    <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1">
                        <Form.Control name="price" onChange={handleChange} style={{paddingTop:"11px", paddingBottom:"11px"}} className='border border-success border-3 border-opacity-50' type="number" placeholder="Price" />
                    </Form.Group>
                    <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1">
                        <Form.Control name="qty" onChange={handleChange} style={{paddingTop:"11px", paddingBottom:"11px"}} className='border border-success border-3 border-opacity-50' type="number" placeholder="Quantity" />
                    </Form.Group>

                    <button style={{width:"30%",paddingTop:"12px", paddingBottom:"12px"}} className=' mt-5 float-end bg-dark text-white text-decoration-none text-center rounded px-4'>Save</button>

                </Form>
            </div>
        </div>
    </div>
  )
}

export default AddProduk