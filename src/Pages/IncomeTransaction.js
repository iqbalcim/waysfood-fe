import React from 'react'
import Approve from './Image/Approve.png'
import Cancel from './Image/Cancel.png'


function IncomeTransaction() {
  return (
    <div className='container-xxl' style={{backgroundColor:"#E5E5E5", height:"100vh"}}>
        <div className='container d-flex p-5'>
            <div className='p-3 w-100'>
                <h3 className='mb-4'>Income Transaction</h3>
                <table border='1px' className='w-100 border-collapse text-middle'>
                   <thead>
                        <tr >
                            <th className='border border-1 border-dark py-2 ps-1'>
                                No
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Name
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Address
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Product Order
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Status
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Action
                            </th>
                        </tr>
                   </thead>
                   <tbody>
                        <tr>
                            <td className='border border-1 border-dark py-2 ps-1'>
                                1
                            </td >
                            <td className='border border-1 border-dark ps-1'>
                                Tidak Ada Akhlak
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Cileungsi
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Geprek Ways
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Waiting Approve
                            </td>
                            <td className='px-2 d-flex mt-1 '>
                                <button className='w-50 me-2  bg-success rounded text-white border-0' type="">Approve</button>
                                <button className='w-50 rounded bg-danger text-white border-0' type="">Cancel</button>
                            </td>
                        </tr>    
                        <tr>
                            <td className='border border-1 border-dark py-2 ps-1'>
                                2
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Mungkin ada namanya
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Planet Namek
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Paket Coffee and Geprek Ways
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Finished
                            </td>
                            <td className='px-2 border border-1 border-dark ps-1'>
                                <img className='mx-auto d-block' src={Approve} alt=""/>
                            </td>
                        </tr>    
                        <tr>
                            <td className='border border-1 border-dark py-2 ps-1'>
                                3
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Lohan 
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Air Kali
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Fish Ways
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Cancel
                            </td>
                            <td  className='px-2 border border-1 border-dark ps-1'>
                                <img className='mx-auto d-block' src={Cancel} alt=""/>
                            </td>
                        </tr>    
                        <tr>
                            <td className='border border-1 border-dark py-2 ps-1'>
                                4
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Goku Super Sayton Jin
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Langit Ke 7
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Paket Life Ways
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Finished
                            </td>
                            <td className='px-2 border border-1 border-dark  '>
                                <img className='mx-auto d-block' src={Approve} alt=""/>
                            </td>
                        </tr>    
                   </tbody>

                </table>
            </div>
        </div>
    </div>
  )
}

export default IncomeTransaction