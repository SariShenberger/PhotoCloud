import { useRef, useState } from "react";
import { DetailsImage } from "./details_image";
import { useNavigate, useNavigation } from "react-router-dom";
import { DeleteImage } from "./delete_image";
import { DownloadImage } from "./download_image";
import { Print } from "./print";
import { BigImageDialog } from "./big_image_dialog";



export const ShowOneImage = (props: any) => {

    const image: Image = props.image;
    const [isShowOption, setIsShowOption] = useState(false);
    const [isBig, setIsBig] = useState(false);

    const navigate = useNavigate();

    return <div onMouseOver={(event) => { setIsShowOption(true) }} onMouseLeave={() => setIsShowOption(false)}>
        <img src={image.image_url} className="rounded float-start " title={image.image_name}
            onMouseOver={(event) => (event.target as any).classList.add('opacity-75')}
            onMouseLeave={(event) => (event.target as any).classList.remove('opacity-75')}
            onDoubleClick={() => setIsBig(true)} />
        {isShowOption &&
            <div>
                <div className=" p-2 position-absolute">
                    <DetailsImage image={image} />
                    <button title="edit" className="btn" onClick={() => navigate(`/home/update-image`, { state: { image: image } })} ><i className="bi bi-pencil-square"></i></button>
                    <DeleteImage image={image} />
                </div>
                <div className="d-flex p-2 position-absolute mx-5">
                    <DownloadImage image={image} />
                    <Print url={image.image_url} />
                </div>
            </div>
        }
        {isBig && <BigImageDialog setIsBig={setIsBig} image={image} />}

    </div>
}