import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { DownloadImage } from './download_image';
import { Print } from './print';

export const BigImage = (props: any) => {
    const arrImages: Image[] = useSelector((state: any) =>
        state.imageSlice.filterImages,
    )
    const image: Image = props.image;
    const [index, setIndex] = useState(arrImages.findIndex((img) => img.idimage === image.idimage));
    const imgBefore = () => {
        if (index - 1 >= 0) {
            setIndex(index - 1);
            props.setImgName(arrImages[index].image_name);
        }

    }
    const imgAfter = () => {
        if (index + 1 < arrImages.length) {
            setIndex(index + 1);
            props.setImgName(arrImages[index].image_name);
        }
    }
    return <div className='w-100' >
        <div className='d-flex position-absolute end-0 mx-3 '>
            <DownloadImage image={arrImages[index]} />
            <Print url={arrImages[index].image_url}/>
        </div><br/>
        <div className='d-flex justify-content-between align-items-center'>
            <button title='before' className='btn m-3 fs-1' onClick={imgBefore}><i className="bi bi-chevron-double-left"></i></button>
            <img className="m-0 w-auto h-85vh" src={arrImages[index].image_url}></img>
            <button title='after' className='btn m-3 fs-1' onClick={imgAfter}><i className="bi bi-chevron-double-right"></i></button>
        </div>
    </div>
}
