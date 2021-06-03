import React, { useState } from 'react';
import Lightbox from '../../components/Lightbox';
import Image from 'next/image';
import FourOhFour from '../404';

export default function vehicle({vehicle, images}){ 
    let [islightboxOpen,setIsLightboxOpen] = useState(false);
    function toggleLightbox()
    {
        setIsLightboxOpen(!islightboxOpen);
    }
    return(
        <>
        { vehicle && images ?
            <div className="center">
                <img src={images[0].url} onClick={toggleLightbox}  height={500} width={700}/>
                {islightboxOpen?
                    <Lightbox images={images} onClose={toggleLightbox} keyboardInteraction={true}/>
                    :
                    <>
                    </>
                }  
                <table class="styled-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Year</th>
                        <th>RegistrationNumber</th>
                        <th>Fuel</th>
                        <th>Address</th>
                        <th>Ownership Status</th>
                        <th>Remarks</th>
                        <th>Reference</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="active-row">
                        <td>{vehicle.Name}</td>
                        <td>{vehicle.Year}</td>
                        <td>{vehicle.RegistrationNumber}</td>
                        <td>{vehicle.Fuel}</td>
                        <td>{vehicle.Address}</td>
                        <td>{vehicle.OwnershipStatus}</td>
                        <td>{vehicle.Remarks}</td>
                        <td>{vehicle.Reference}</td>
                    </tr>
                </tbody>
            </table>
            </div>
            :
            <FourOhFour/>
        }   
        </>
    );
}

export const getServerSideProps = async (context) => {
    let res;
    try{
        res = await fetch(`${process.env.API_IP}/api/vehicle/${context.params.vehicle}`);
    }
    catch (error) {
        return{
            props:{
                vehicle:null,
                images:null
            }
        }
    }
    const data = await res.json();
    console.log(data);
    const images = [];
    for(let i=0;i<data.PicturesCount;i++){
        images.push({
            url:`${process.env.API_IP}/api/image/${data._id}/${i}`,
            title:`${i}`
        });
    }
    console.log(images);
    return {
        props : {
            vehicle: data,
            images: images
        }
    }
}
