import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Lightbox from '../../components/Lightbox';
import Image from 'next/image';

export default function vehicle({vehicle, images}){ 
    let [islightboxOpen,setIsLightboxOpen] = useState(false);
    function toggleLightbox()
    {
        setIsLightboxOpen(!islightboxOpen);
    }
    return(
        <div className="center">
            <Image src={images[0].url} onClick={toggleLightbox}  height={500} width={700}/>
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
                    <td>{vehicle.name}</td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.registrationNumber.state+'-'+vehicle.registrationNumber.rto+'-'+vehicle.registrationNumber.series+'-'+vehicle.registrationNumber.number+'-'}</td>
                    <td>{vehicle.fuel}</td>
                    <td>{vehicle.address}</td>
                    <td>{vehicle.ownershipStatus}</td>
                    <td>{vehicle.remarks}</td>
                    <td>{vehicle.reference}</td>
                </tr>
            </tbody>
        </table>
        </div>
    );
}

export const getServerSideProps = async (context) => {

    const res = await fetch(`${process.env.API_IP}/api/Vehicle/${context.params.vehicle}`);
    const data = await res.json();
    const images = [];
    for(let i=0;i<data.imagesCount;i++){
        images.push({
            url:`${process.env.API_IP}/api/Images/${data.id}/${i}`,
            title:`${i}`
        });
    }
    return {
        props : {
            vehicle: data,
            images: images
        }
    }
}
